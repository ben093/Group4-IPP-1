app.factory("imageSets", function($http){

    var imageSets = [{"name": "Animals",
                      "imageSet":
                                    ['bat.jpg', 'cat.jpg', 'coolOwl.jpeg',
                                    'dog.jpg', 'fish.jpg', 'fox.jpg', 'frog.jpg',
                                    'gecko.jpg', 'koala.jpg', 'lightsaber.jpg', 'lion.jpeg',
                                    'monkey.jpg', 'pig.jpg', 'tiger.jpg', 'turtle.jpeg', 'wolf.jpg']
                    },
                    {"name": "Places",
                     "imageSet" :
                                    ['bridge.jpg', 'city.jpg', 'cliff.jpg', 'cliff2.jpg',
                                    'coolbridge.jpg', 'fountain.jpg', 'huts.jpg', 'palmtree.jpg',
                                    'red.jpg', 'resort.jpg', 'river.jpg', 'space.jpg',
                                    'sweet.jpg', 'treehouse.jpg', 'woods.jpg']
                    },
                    {"name": "Random",
                    "imageSet" : 
                                    ['apple.jpg', 'camera.jpg', 'cheetos.jpg','cliffdive.jpg', 
                                    'dragon.jpg', 'earth.gif', 'einstein.jpg', 'faceless.jpg', 
                                    'fried_egg.jpg', 'honestabe.jpg', 'hottie.jpg', 'jacked.jpg',
                                    'leaningtower.jpg','mikemyers.jpg', 'paweater.jpg']
                    },
                    {"name" : "Sports",
                     "imageSet" :
                                    ['ali.jpg', 'baseball.jpg', 'basketball.jpg', 'bell.jpg', 
                                    'bike.jpg', 'fans.jpg', 'football.jpg', 'football2.jpg',
                                    'lacross.jpg', 'messi.jpg', 'motorcross.jpg', 'rugby.jpg',
                                    'soccer.jpg', 'tennis.jpg', 'whistle.jpg', 'xbox.jpg']
                    }];
    return imageSets;
});

