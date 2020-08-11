"use strict";
var Dreamers;
(function (Dreamers) {
    class EnemySpawnController {
        //Determines what type of enemy is going to spawn based on the wave, difficulty and on a random number
        enemySpawnChoice(wave, difficulty) {
            let enemyChoice = Math.floor(Math.random() * 3) + 1;
            switch (wave) {
                case 1:
                    switch (difficulty) {
                        case "easy":
                            switch (enemyChoice) {
                                case 1:
                                    return 1;
                                case 2:
                                    return 1;
                                case 3:
                                    return 1;
                            }
                        case "medium":
                            switch (enemyChoice) {
                                case 1:
                                    return 1;
                                case 2:
                                    return 1;
                                case 3:
                                    return 1;
                            }
                        case "hard":
                            switch (enemyChoice) {
                                case 1:
                                    return 1;
                                case 2:
                                    return 2;
                                case 3:
                                    return 3;
                            }
                    }
                    break;
                case 2:
                    switch (difficulty) {
                        case "easy":
                            switch (enemyChoice) {
                                case 1:
                                    return 1;
                                case 2:
                                    return 1;
                                case 3:
                                    return 2;
                            }
                            break;
                        case "medium":
                            switch (enemyChoice) {
                                case 1:
                                    return 1;
                                case 2:
                                    return 2;
                                case 3:
                                    return 2;
                            }
                            break;
                        case "hard":
                            switch (enemyChoice) {
                                case 1:
                                    return 1;
                                case 2:
                                    return 2;
                                case 3:
                                    return 3;
                            }
                    }
                    break;
                case 3:
                    switch (difficulty) {
                        case "easy":
                            switch (enemyChoice) {
                                case 1:
                                    return 1;
                                case 2:
                                    return 2;
                                case 3:
                                    return 2;
                            }
                            break;
                        case "medium":
                            switch (enemyChoice) {
                                case 1:
                                    return 1;
                                case 2:
                                    return 2;
                                case 3:
                                    return 3;
                            }
                            break;
                        case "hard":
                            switch (enemyChoice) {
                                case 1:
                                    return 2;
                                case 2:
                                    return 2;
                                case 3:
                                    return 3;
                            }
                    }
                    break;
                case 4:
                    switch (difficulty) {
                        case "easy":
                            switch (enemyChoice) {
                                case 1:
                                    return 1;
                                case 2:
                                    return 2;
                                case 3:
                                    return 2;
                            }
                            break;
                        case "medium":
                            switch (enemyChoice) {
                                case 1:
                                    return 2;
                                case 2:
                                    return 2;
                                case 3:
                                    return 3;
                            }
                            break;
                        case "hard":
                            switch (enemyChoice) {
                                case 1:
                                    return 2;
                                case 2:
                                    return 3;
                                case 3:
                                    return 3;
                            }
                    }
                    break;
                //Guarentees the boss on wave 5
                case 5:
                    return 4;
            }
            //If for whatever reason there is a problem, return a medium enemy
            return 2;
        }
    }
    Dreamers.EnemySpawnController = EnemySpawnController;
})(Dreamers || (Dreamers = {}));
//# sourceMappingURL=enemySpawnController.js.map