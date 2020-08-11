namespace Dreamers {
    import ƒAid = FudgeAid;
    //Runs the onload function
    window.addEventListener("load", onLoad);

    //Global variables
    export let viewport: ƒ.Viewport;
    let camera: ƒ.ComponentCamera;
    //The parent node to all the nodes in the game
    let graph: ƒ.Node = new ƒ.Node("graph");

    let player: Player;
    //Sets the difficulty to be east by default
    let difficulty: string = "easy";

    let listOfBullets: Bullet[] = [];

    let listOfEnemies: Enemy[] = [];
    //The time between enemy spawns
    let enemySpawnRecharge: number = 0;
    //The current enemy spawn location
    let currentEnemySpawn: number = 0;
    //determines the enemy type to spawn
    let enemyController: EnemySpawnController;

    let wave: number = 0;
    //The cooldown between waves
    let waveBreak: number = 0;
    let canHeal: boolean = false;
    let enemiesRemaining: number = 0;
    //The opacity of the game over message
    let gameOverOpacity: number = 0;

    //sets up the game before the first frame
    function onLoad(_event: Event): void {
        //The canvas that contains the games entirety
        const canvas: HTMLCanvasElement = document.querySelector("canvas");

        //The camera
        camera = new ƒ.ComponentCamera();
        camera.pivot.translate(ƒ.Vector3.Y(15));
        camera.pivot.lookAt(ƒ.Vector3.ZERO(), ƒ.Vector3.X(1));
        camera.backgroundColor = ƒ.Color.CSS("pink");

        //The viewport
        viewport = new ƒ.Viewport();
        viewport.initialize("viewport", graph, camera, canvas);

        //The color scheme of the game
        ƒAid.addStandardLightComponents(graph, new ƒ.Color(0.5, 0.5, 0.5));
        
        //color shape and translation of the ground
        let planeMaterial: ƒ.Material = new ƒ.Material("plane", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("lightblue")));
        let planeMesh: ƒ.MeshQuad = new ƒ.MeshQuad();
        let planeMatrix: ƒ.Matrix4x4 = new ƒ.Matrix4x4;
        planeMatrix.translateZ(-0.1);
        //scaling and rotation of the ground
        planeMatrix.scale(ƒ.Vector3.ONE(17.5));
        planeMatrix.rotation = new ƒ.Vector3(-90, 0, 0);
        //The ground node
        let plane: ƒAid.Node = new ƒAid.Node("plane", planeMatrix, planeMaterial, planeMesh);
        //adds the ground to the graph
        graph.addChild(plane);

        //The player
        player = new Player();
        
        enemyController = new EnemySpawnController();
        //The walls of the arena
        graph.addChild(new Map());

        //The update event runs every frame
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 30);

        //Shooting/aiming Events
        viewport.activatePointerEvent(ƒ.EVENT_POINTER.DOWN, true);
        viewport.addEventListener(ƒ.EVENT_POINTER.DOWN, mouseDown);

        //Html button events
        let prevButton: HTMLElement = document.getElementById("prev-wave");
        prevButton.addEventListener("click", previousWave);

        let nextButton: HTMLElement = document.getElementById("next-wave");
        nextButton.addEventListener("click", nextWave);

        let easyButton: HTMLElement = document.getElementById("easy");
        easyButton.addEventListener("click", easyDifficulty);

        let mediumButton: HTMLElement = document.getElementById("medium");
        mediumButton.addEventListener("click", mediumDifficulty);

        let hardButton: HTMLElement = document.getElementById("hard");
        hardButton.addEventListener("click", hardDifficulty);

        //Sets the initial difficulty message 
        document.getElementById("difficulty").innerHTML = "Difficulty: " + difficulty;
    }//-------end of function-------

    //runs this method every frame
    function update(_event: ƒ.Eventƒ): void {

        //If the player has deafeated the final wave display the message "YOU WIN!!!" gradually over time
        if (listOfEnemies.length == 0 && wave == 6) {
            if (gameOverOpacity < 1) {
                gameOverOpacity += 0.01;
                document.getElementById("game-over-message").innerHTML = "YOU WIN!!!";
                document.getElementById("game-over").style.opacity = gameOverOpacity.toString();
            }
        }

        //If the player has ran out of health display the message "Game Over" gradually over time
        if (player.update(camera)) {
            if (gameOverOpacity < 1) {
                gameOverOpacity += 0.01;
                document.getElementById("game-over-message").innerHTML = "Game Over";
                document.getElementById("game-over").style.opacity = gameOverOpacity.toString();
            }

            player.gameOver();

            //Have all enemies freeze in place and slowly rotate. Mocking you.
            for (let i: number = 0; i < listOfEnemies.length; i++) {
                let enemy: Enemy = listOfEnemies[i];
                enemy.mtxLocal.rotateY(1);
            }
            //Update the viewport
            viewport.draw();
        //If the player hasn't won or lost yet, meaning the game is still in progress....
        } else {   
            
            //Run through the current list of player generated bullets and update their location/exsistance 
            if (listOfBullets.length >= 1) {
                for (let i: number = 0; i < listOfBullets.length; i++) {
                    let bullet: Bullet = listOfBullets[i];
                    if (bullet.update()) {
                        //If the bullet is outside the game bounds, remove it from the list of bullets
                        listOfBullets.splice(i, 1);
                    }
                    //For each bullet, run through the list of enemies and check if there is a collision
                    for (let j: number = 0; j < listOfEnemies.length; j++) {
                        if (bullet.collisionCheck(listOfEnemies[j], listOfEnemies[j].getRadius())) {
                            //If so, remove the bullet from the list of bullets. Also modify the enemy's health
                            listOfEnemies[j].setHealth(listOfEnemies[j].getHealth() - bullet.getDamage());
                            listOfBullets.splice(i, 1);
                        }
                    }
                }
            }

            //If the list of enemies contains at least one enemy 
            if (listOfEnemies.length >= 1) {
                //Run through the list of enemies....
                for (let i: number = 0; i < listOfEnemies.length; i++) {
                    let enemy: Enemy = listOfEnemies[i];
                    //if the enemy has no health, remove it from the list of enemies and the graph
                    if (enemy.getHealth() <= 0) {
                        listOfEnemies.splice(i, 1);
                        graph.removeChild(enemy);
                        //Reward the player with points depending on the difficulty
                        switch (difficulty) {
                            case "easy":
                                player.setPoints(player.getPoints() + 10);
                                break;
                            case "medium":
                                player.setPoints(player.getPoints() + 20);
                                break;
                            case "hard":
                                player.setPoints(player.getPoints() + 30);
                                break;
                        }
                    //If the enemy still has health remaining, update it's movement and check if it's colliding with the player
                    } else {
                        enemy.update(player);
                        if (enemy.collisionCheck(player)) {
                            //if there is a collision, modify the players health
                            player.setHealth(player.getHealth() - enemy.getDamage());
                        }
                    }
                }
            }
            //If there are still enemies left to spawn in this wave....
            if (enemiesRemaining > 0) {
                //...And the enemy respawn timer has finished waiting...
                if (enemySpawnRecharge == 0) {
                    //Chose a new enemy's location to spawn in based on a random number. 
                    let newEnemySpawn: number = Math.floor(Math.random() * 4) + 1;
                    //Ensure the random number chosen isn't the same as the last
                    while (currentEnemySpawn == newEnemySpawn) {
                        newEnemySpawn = Math.floor(Math.random() * 4) + 1;
                    }
                    currentEnemySpawn = newEnemySpawn;
                    let newEnemy: Enemy;
                    //Chose the enemy type to spawn in based on the wave, difficulty, and another random number
                    switch (enemyController.enemySpawnChoice(wave, difficulty)) {
                        case 1:
                            newEnemy = new SmallEnemy(currentEnemySpawn);
                            break;
                        case 2:
                            newEnemy = new MediumEnemy(currentEnemySpawn);
                            break;
                        case 3:
                            newEnemy = new BigEnemy(currentEnemySpawn);
                            break;
                        case 4:
                            newEnemy = new Boss(currentEnemySpawn);
                            break;
                    }
                    //Add the new enemy to the list of enemies and reduce the number of enemies left in the wave. 
                    //Also reset the enemy spawn timer and update the remaining enemies in the html 
                    listOfEnemies.push(newEnemy);
                    enemiesRemaining--;
                    enemySpawnRecharge = 10;
                    document.getElementById("enemies-rem").innerHTML = "Enemies Remaining: " + enemiesRemaining;
                //if another enemy is not ready to spawn in, continue waiting
                } else {
                    enemySpawnRecharge--;
                }
            }
            //if there are no more enemies waiting to spawn in this wave....
            else {
                //and the final enemy has been defeated
                if (listOfEnemies.length == 0 && waveBreak == 0 && wave < 6) {
                    //begin the breather between waves
                    waveBreak = 120;
                    wave++;
                    //Once wave 5 has been completed there is no need to update the wave information in the html
                    if (wave != 6) {
                        document.getElementById("wave").innerHTML = "Wave: " + wave;
                    }
                //While waiting for the next wave
                } else if (listOfEnemies.length == 0 && waveBreak > 0) {
                    //continue waiting
                    waveBreak--;
                    //Draw the players attention to what wave they are up to...
                    if (waveBreak % 7.5 == 0) {
                        if (document.getElementById("wave").style.color == "white") {
                            document.getElementById("wave").style.color = "red";
                        } else if (document.getElementById("wave").style.color == "red") {
                            document.getElementById("wave").style.color = "white";
                        }
                    }
                    //...And their increasing health UNLESS they manually skipped the wave, in which case they can not heal
                    if (canHeal) {
                        if (waveBreak % 7.5 == 0) {
                            if (document.getElementById("health").style.color == "white") {
                                document.getElementById("health").style.color = "lawngreen";
                            } else if (document.getElementById("health").style.color == "lawngreen") {
                                document.getElementById("health").style.color = "white";
                            }
                        }
                        //If the player hasn't manually skipped the wave thier health will increase
                        if (waveBreak % 24 == 0 && wave != 1) {
                            if (player.getHealth() < 1) {
                                player.setHealth(player.getHealth() + 0.1);
                            }
                        }
                    }
                    //Ensures all html text is white once the wave break is over
                    else {
                        document.getElementById("health").style.color = "white";
                    }
                    //Determines how many enemies are to spawn dependant on the wave
                    if (waveBreak == 0) {
                        switch (wave) {
                            case 1:
                                enemiesRemaining = 20;
                                break;
                            case 2:
                                enemiesRemaining = 30;
                                break;
                            case 3:
                                enemiesRemaining = 40;
                                break;
                            case 4:
                                enemiesRemaining = 50;
                                break;
                            case 5:
                                enemiesRemaining = 1;
                                break;
                        }
                        document.getElementById("wave").style.color = "white";
                        document.getElementById("health").style.color = "white";
                    }
                    //Updates the new enemies remaining information in the html
                    document.getElementById("enemies-rem").innerHTML = "Enemies Remaining: " + enemiesRemaining;
                }
                //once the wave break is over, the player is given the chance to heal again
                //this is only if they complete the wave without manually skipping it
                else if (waveBreak == 0) {
                    canHeal = true;
                }
            }

            //updates the viewport
            viewport.draw();
        }
    }//-------end of function-------

    //Runs the frame that the left mouse is clicked
    function mouseDown(_event: ƒ.EventPointer): void {
        //If the player isn't already dead
        if (player.getHealth() >= 0.1) {
            //Collect the position of the mouse
            let ray: ƒ.Ray = viewport.getRayFromClient(new ƒ.Vector2(_event.pointerX, _event.pointerY));
            let pointOfIntersection: ƒ.Vector3 = ray.intersectPlane(ƒ.Vector3.ZERO(), new ƒ.Vector3(0, 1, 0));
            //Rotate the payer towards the mouse position when it was clicked
            player.lookTowards(pointOfIntersection);
            
            //Create a bullet that will face and move towards the mouse's position when it was clicked 
            let bullet: Bullet = new Bullet(player.getComponent(ƒ.ComponentTransform).local.translation, pointOfIntersection);
            listOfBullets.push(bullet);
        }
    }///-------end of function-------

    //Runs when the player clicks the "next wave" button
    function nextWave(): void {
        //If the player is below wave 5 and isn't dead
        if (wave < 5 && player.getHealth() >= 1) {
            //Remove all enemies from the graph and from the list of enemies
            for (let i: number = 0; i < listOfEnemies.length; i++) {
                graph.removeChild(listOfEnemies[i]);
            }
            listOfEnemies.splice(0, listOfEnemies.length);
            //Prevent any more enemies from spawning
            enemiesRemaining = 0;
            //Give the player a break before the next wave begins
            waveBreak = 0;
            //And prevent the player from healing because they haven't earnt it.
            canHeal = false;
        }
    }

    //Runs when the player clicks the "last wave" button
    function previousWave(): void {
        //If the player is above wave 1 and isn't dead
        if (wave > 1 && player.getHealth() >= 1) {
            //Remove all enemies from the graph and from the list of enemies
            for (let i: number = 0; i < listOfEnemies.length; i++) {
                graph.removeChild(listOfEnemies[i]);
            }
            listOfEnemies.splice(0, listOfEnemies.length);
            //Prevent any more enemies from spawning
            enemiesRemaining = 0;
            wave -= 2;
            //Give the player a break before the next wave begins
            waveBreak = 0;
            //And prevent the player from healing because they haven't earnt it.
            canHeal = false;
        }
    }

    //Runs when the player selects one of the difficulties
    function resetWave(): void {
        //Remove all enemies from the graph and from the list of enemies
        for (let i: number = 0; i < listOfEnemies.length; i++) {
            graph.removeChild(listOfEnemies[i]);
        }
        listOfEnemies.splice(0, listOfEnemies.length);
        //Prevent any more enemies from spawning
        enemiesRemaining = 0;
        //Restart the game
        wave = 0;
        waveBreak = 0;
        canHeal = false;
        graph.removeChild(player);
        player = new Player();
        camera.pivot.translation = new ƒ.Vector3(0, 15, 0);
    }

    //Runs if the player clicks the "easy" button
    function easyDifficulty(): void {
        difficulty = "easy";
        document.getElementById("difficulty").innerHTML = "Difficulty: " + difficulty;
        resetWave();
    }

    //Runs if the player clicks the "medium" button
    function mediumDifficulty(): void {
        difficulty = "medium";
        document.getElementById("difficulty").innerHTML = "Difficulty: " + difficulty;
        resetWave();
    }

    //Runs if the player clicks the "hard" button
    function hardDifficulty(): void {
        difficulty = "hard";
        document.getElementById("difficulty").innerHTML = "Difficulty: " + difficulty;
        resetWave();
    }
}


