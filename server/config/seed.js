/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var PostboardSheet = require('../api/postboard/postboard.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

PostboardSheet.find({}).remove(function() {
  PostboardSheet.create({
  "creationDate" : "2015-06-25T11:15:29Z",
  "UUID" : "BAE285A1-638E-4544-A4E2-06941D1B19EC",
  "name" : "5946",
  "clusters" : [
    {
      "height" : "779",
      "positionX" : 6.563943051620176,
      "notes" : [
        {
          "isDigitalNote" : false,
          "index" : 6,
          "noteUUID" : "FB9CCF69-D726-41F2-A14F-0BF51F87AEFF",
          "centerY" : 122.5382087462089,
          "backgroundColor" : {
            "red" : 1,
            "alpha" : 1,
            "blue" : 0.1882352977991104,
            "green" : 0.8509804010391235
          },
          "contentUUID" : "A7BB7FC9-FA4C-4245-9900-A7D4DC90F6C8",
          "layoutRotation" : 0.1448124293377107,
          "centerX" : 513.1096708251349,
          "corners" : [
            [
              0.5876225233078003,
              0.2089460790157318
            ],
            [
              0.6758578419685364,
              0.2218137234449387
            ],
            [
              0.6587010025978088,
              0.311887264251709
            ],
            [
              0.5704656839370728,
              0.2990196049213409
            ]
          ],
          "layoutIndex" : 9,
          "enhancementMethod" : "background-separation",
          "positionInitialized" : true,
          "UUID" : "AE8BAA37-3AE1-45CF-9589-65578FD28905",
          "board" : "EBC718E7-5C1D-4CC4-AD3E-3C1AF1332C51",
          "layoutZOrder" : 6
        },
        {
          "isDigitalNote" : false,
          "index" : 23,
          "noteUUID" : "D0898DF3-4E27-4BB6-8BF4-886634C16F9B",
          "centerY" : 641.5079249216066,
          "backgroundColor" : {
            "red" : 1,
            "alpha" : 1,
            "blue" : 0.1882352977991104,
            "green" : 0.8509804010391235
          },
          "contentUUID" : "DF85B955-D2E4-477E-9044-28002CB7DE3B",
          "layoutRotation" : 0,
          "centerX" : 145.7164472363535,
          "corners" : [
            [
              0.2144607901573181,
              0.7365196347236633
            ],
            [
              0.2977941036224365,
              0.7365196347236633
            ],
            [
              0.2959558963775635,
              0.8247548937797546
            ],
            [
              0.2126225531101227,
              0.8229166865348816
            ]
          ],
          "layoutIndex" : 31,
          "enhancementMethod" : "background-separation",
          "positionInitialized" : true,
          "UUID" : "BF4331A2-BF88-4ECD-8D70-E328AEA26CE2",
          "board" : "EBC718E7-5C1D-4CC4-AD3E-3C1AF1332C51",
          "layoutZOrder" : 23
        },
        {
          "isDigitalNote" : false,
          "index" : 19,
          "noteUUID" : "B6343DDE-AF88-4076-AE6F-5B1D1FCDB919",
          "centerY" : 633.6308142197421,
          "backgroundColor" : {
            "red" : 0.9960784316062927,
            "alpha" : 1,
            "blue" : 0.1607843190431595,
            "green" : 0.8392156958580017
          },
          "contentUUID" : "F3B9A77E-8A4B-4120-9B93-7F1507BD8A83",
          "layoutRotation" : 0.09930320568974298,
          "centerX" : 49.27954730147678,
          "corners" : [
            [
              0.1210171580314636,
              0.7264093160629272
            ],
            [
              0.2040441185235977,
              0.7346813678741455
            ],
            [
              0.196078434586525,
              0.8180146813392639
            ],
            [
              0.1133578419685364,
              0.8100489974021912
            ]
          ],
          "layoutIndex" : 30,
          "enhancementMethod" : "background-separation",
          "positionInitialized" : true,
          "UUID" : "F0B10A31-2FC4-4663-AE03-D62FE44EB6C0",
          "board" : "EBC718E7-5C1D-4CC4-AD3E-3C1AF1332C51",
          "layoutZOrder" : 19
        },
        {
          "isDigitalNote" : false,
          "index" : 1,
          "noteUUID" : "EF149BF8-0D4E-4B09-A433-1A4A974A3118",
          "centerY" : 459.3408240152073,
          "backgroundColor" : {
            "red" : 1,
            "alpha" : 1,
            "blue" : 0.2156862765550613,
            "green" : 0.8509804010391235
          },
          "contentUUID" : "77C98D86-98FA-46F5-8C19-D1C04B834A48",
          "layoutRotation" : 0.04376769317777152,
          "centerX" : 167.4357763536854,
          "corners" : [
            [
              0.2365196049213409,
              0.5533088445663452
            ],
            [
              0.3204656839370728,
              0.5569853186607361
            ],
            [
              0.3180147111415863,
              0.6421568393707275
            ],
            [
              0.2328431308269501,
              0.6384803652763367
            ]
          ],
          "layoutIndex" : 21,
          "enhancementMethod" : "background-separation",
          "positionInitialized" : true,
          "UUID" : "5BD493AC-1A1B-4150-843C-DF725A78851A",
          "board" : "EBC718E7-5C1D-4CC4-AD3E-3C1AF1332C51",
          "layoutZOrder" : 1
        },
        {
          "isDigitalNote" : false,
          "index" : 4,
          "noteUUID" : "1B3A97E4-1B69-4EBA-80A8-3D280EE26BA1",
          "centerY" : 327.0364379176706,
          "backgroundColor" : {
            "red" : 1,
            "alpha" : 1,
            "blue" : 0.2156862765550613,
            "green" : 0.8509804010391235
          },
          "contentUUID" : "4976B86A-C03C-4F48-9AB6-927BB02D9453",
          "layoutRotation" : 6.261605905999932,
          "centerX" : 261.6548536982355,
          "corners" : [
            [
              0.3284313678741455,
              0.4234068691730499
            ],
            [
              0.4136029481887817,
              0.4215686321258545
            ],
            [
              0.4148284196853638,
              0.5067402124404907
            ],
            [
              0.3284313678741455,
              0.5091911554336548
            ]
          ],
          "layoutIndex" : 17,
          "enhancementMethod" : "background-separation",
          "positionInitialized" : true,
          "UUID" : "8A1E4F1E-110A-476E-8363-8FFE5FC639C9",
          "board" : "EBC718E7-5C1D-4CC4-AD3E-3C1AF1332C51",
          "layoutZOrder" : 4
        },
        {
          "isDigitalNote" : false,
          "index" : 9,
          "noteUUID" : "30D5297C-2C3D-4D88-8C8C-EF8E5BAF0160",
          "centerY" : 182.6487517698207,
          "backgroundColor" : {
            "red" : 1,
            "alpha" : 1,
            "blue" : 0.2000000029802322,
            "green" : 0.8509804010391235
          },
          "contentUUID" : "460030B4-C2CD-4009-9D45-0221A2806D58",
          "layoutRotation" : 6.276142933698097,
          "centerX" : 258.748752882141,
          "corners" : [
            [
              0.325367659330368,
              0.2769607901573181
            ],
            [
              0.4123774468898773,
              0.2763480246067047
            ],
            [
              0.4111519753932953,
              0.3651960790157318
            ],
            [
              0.3247548937797546,
              0.3639705777168274
            ]
          ],
          "layoutIndex" : 7,
          "enhancementMethod" : "background-separation",
          "positionInitialized" : true,
          "UUID" : "FFC9E6DA-1CA6-49F2-9780-3741FF55775C",
          "board" : "EBC718E7-5C1D-4CC4-AD3E-3C1AF1332C51",
          "layoutZOrder" : 9
        },
        {
          "isDigitalNote" : false,
          "index" : 3,
          "noteUUID" : "93CC7FDF-80B0-4F95-85EA-3744C1F02CBC",
          "centerY" : 51.72094444153118,
          "backgroundColor" : {
            "red" : 0.9960784316062927,
            "alpha" : 1,
            "blue" : 0.250980406999588,
            "green" : 0.8666666746139526
          },
          "contentUUID" : "7A3E9302-0253-4C40-8AB6-4B4FEEA1BC45",
          "layoutRotation" : 6.137173149852424,
          "centerX" : 43.23789913612953,
          "corners" : [
            [
              0.1041666641831398,
              0.1507352888584137
            ],
            [
              0.1875,
              0.1384803950786591
            ],
            [
              0.2034313678741455,
              0.2291666716337204
            ],
            [
              0.1151960790157318,
              0.2395833283662796
            ]
          ],
          "layoutIndex" : 0,
          "enhancementMethod" : "background-separation",
          "positionInitialized" : true,
          "UUID" : "F805B14E-3B2B-4CA0-A79C-C2419EFDC8B1",
          "board" : "EBC718E7-5C1D-4CC4-AD3E-3C1AF1332C51",
          "layoutZOrder" : 3
        },
        {
          "isDigitalNote" : false,
          "index" : 5,
          "noteUUID" : "9EA9F441-FD61-4867-9EE4-C819DB292720",
          "centerY" : 201.4619800710582,
          "backgroundColor" : {
            "red" : 1,
            "alpha" : 1,
            "blue" : 0.2117647081613541,
            "green" : 0.8588235378265381
          },
          "contentUUID" : "993BFC7C-E4E3-4B78-AEE0-785E30D68C34",
          "layoutRotation" : 0.05588598446665825,
          "centerX" : 375.9107873964329,
          "corners" : [
            [
              0.4448529481887817,
              0.2935048937797546
            ],
            [
              0.532475471496582,
              0.2984068691730499
            ],
            [
              0.5263480544090271,
              0.3854166567325592
            ],
            [
              0.4393382370471954,
              0.3805147111415863
            ]
          ],
          "layoutIndex" : 13,
          "enhancementMethod" : "background-separation",
          "positionInitialized" : true,
          "UUID" : "1DBFB54A-B605-4AE7-B538-D62FA543A50A",
          "board" : "EBC718E7-5C1D-4CC4-AD3E-3C1AF1332C51",
          "layoutZOrder" : 5
        },
        {
          "isDigitalNote" : false,
          "index" : 0,
          "noteUUID" : "4FE9A639-AA4B-4954-8F43-B885F098AEC6",
          "centerY" : 456.2817650430383,
          "backgroundColor" : {
            "red" : 1,
            "alpha" : 1,
            "blue" : 0.1882352977991104,
            "green" : 0.8509804010391235
          },
          "contentUUID" : "645A7C38-5EC3-4AFF-B516-E82A3144E364",
          "layoutRotation" : 6.203643839843894,
          "centerX" : 363.0627337619333,
          "corners" : [
            [
              0.4270833432674408,
              0.5557597875595093
            ],
            [
              0.5116421580314636,
              0.5490196347236633
            ],
            [
              0.5183823704719543,
              0.6335784196853638
            ],
            [
              0.4344362616539001,
              0.6403186321258545
            ]
          ],
          "layoutIndex" : 23,
          "enhancementMethod" : "background-separation",
          "positionInitialized" : true,
          "UUID" : "A04AEB07-DB21-4691-8BAB-45D05A3ABB1B",
          "board" : "EBC718E7-5C1D-4CC4-AD3E-3C1AF1332C51",
          "layoutZOrder" : 0
        },
        {
          "isDigitalNote" : false,
          "index" : 20,
          "noteUUID" : "5E3E8441-62C5-4819-83A6-F941C8EB22C8",
          "centerY" : 331.0132235085749,
          "backgroundColor" : {
            "red" : 1,
            "alpha" : 1,
            "blue" : 0.2000000029802322,
            "green" : 0.8509804010391235
          },
          "contentUUID" : "2C2A8855-64E1-4DE1-97D3-6160CB39C9B0",
          "layoutRotation" : 0.03544629174662878,
          "centerX" : 356.7916576615208,
          "corners" : [
            [
              0.4252451062202454,
              0.424632340669632
            ],
            [
              0.5116421580314636,
              0.4276960790157318
            ],
            [
              0.5079656839370728,
              0.5140931606292725
            ],
            [
              0.4215686321258545,
              0.5104166865348816
            ]
          ],
          "layoutIndex" : 18,
          "enhancementMethod" : "background-separation",
          "positionInitialized" : true,
          "UUID" : "7E490680-6098-4BF1-BDC2-DB8064BA95D3",
          "board" : "EBC718E7-5C1D-4CC4-AD3E-3C1AF1332C51",
          "layoutZOrder" : 20
        },
        {
          "isDigitalNote" : false,
          "index" : 24,
          "noteUUID" : "4C920AAF-72EA-4C43-B4AB-0CC13596283C",
          "centerY" : 740.0096744122611,
          "backgroundColor" : {
            "red" : 1,
            "alpha" : 1,
            "blue" : 0.1843137294054031,
            "green" : 0.843137264251709
          },
          "contentUUID" : "DC000E98-A7AA-4E21-B706-7195F1EE89FD",
          "layoutRotation" : 0.04793372052302817,
          "centerX" : 74.44031962230812,
          "corners" : [
            [
              0.1449142098426819,
              0.8330269455909729
            ],
            [
              0.227941170334816,
              0.8370097875595093
            ],
            [
              0.2224264740943909,
              0.9246323704719543
            ],
            [
              0.1400122493505478,
              0.920649528503418
            ]
          ],
          "layoutIndex" : 35,
          "enhancementMethod" : "background-separation",
          "positionInitialized" : true,
          "UUID" : "DCED710F-892E-473A-A1F8-5AAF43D7BCEE",
          "board" : "EBC718E7-5C1D-4CC4-AD3E-3C1AF1332C51",
          "layoutZOrder" : 24
        },
        {
          "isDigitalNote" : false,
          "index" : 13,
          "noteUUID" : "6A5956E1-6D33-4E9F-A4F8-68E2956766C8",
          "centerY" : 522.3574715745323,
          "backgroundColor" : {
            "red" : 1,
            "alpha" : 1,
            "blue" : 0.2000000029802322,
            "green" : 0.8509804010391235
          },
          "contentUUID" : "84952A32-1CE4-4FB5-9945-7A5089443F5D",
          "layoutRotation" : 0.01459728040087874,
          "centerX" : 44.76743234183263,
          "corners" : [
            [
              0.1133578419685364,
              0.6176470518112183
            ],
            [
              0.1973039209842682,
              0.6188725233078003
            ],
            [
              0.1948529481887817,
              0.7046568393707275
            ],
            [
              0.1109068617224693,
              0.7022058963775635
            ]
          ],
          "layoutIndex" : 25,
          "enhancementMethod" : "background-separation",
          "positionInitialized" : true,
          "UUID" : "49709305-7E7E-4B27-B301-16A910AFAB1E",
          "board" : "EBC718E7-5C1D-4CC4-AD3E-3C1AF1332C51",
          "layoutZOrder" : 13
        },
        {
          "isDigitalNote" : false,
          "index" : 15,
          "noteUUID" : "3F5E3B1A-CD87-4C66-A506-5879AE1DC9D6",
          "centerY" : 40.40241657349755,
          "backgroundColor" : {
            "red" : 1,
            "alpha" : 1,
            "blue" : 0.2588235437870026,
            "green" : 0.8705882430076599
          },
          "contentUUID" : "A4B04D13-D3AD-4FBC-BF14-DD91BE242E0C",
          "layoutRotation" : 0.06241887307947595,
          "centerX" : 142.8103352614032,
          "corners" : [
            [
              0.2107843160629272,
              0.1311274468898773
            ],
            [
              0.2990196049213409,
              0.1366421580314636
            ],
            [
              0.2935048937797546,
              0.2248774468898773
            ],
            [
              0.2058823555707932,
              0.2199754863977432
            ]
          ],
          "layoutIndex" : 1,
          "enhancementMethod" : "background-separation",
          "positionInitialized" : true,
          "UUID" : "462918FA-1F51-476A-8BF3-4DFD9F30314A",
          "board" : "EBC718E7-5C1D-4CC4-AD3E-3C1AF1332C51",
          "layoutZOrder" : 15
        },
        {
          "isDigitalNote" : false,
          "index" : 7,
          "noteUUID" : "0229501D-0B7D-4717-BBC3-C7B142F0DF18",
          "centerY" : 54.3211438239511,
          "backgroundColor" : {
            "red" : 1,
            "alpha" : 1,
            "blue" : 0.2117647081613541,
            "green" : 0.8588235378265381
          },
          "contentUUID" : "5711FFA2-4E60-4010-A54B-4DBF1122630D",
          "layoutRotation" : 0.09065985653404397,
          "centerX" : 271.5968065166405,
          "corners" : [
            [
              0.3419117629528046,
              0.1427696049213409
            ],
            [
              0.4295343160629272,
              0.1507352888584137
            ],
            [
              0.4203431308269501,
              0.241421565413475
            ],
            [
              0.3333333432674408,
              0.2334558814764023
            ]
          ],
          "layoutIndex" : 2,
          "enhancementMethod" : "background-separation",
          "positionInitialized" : true,
          "UUID" : "F0A285AB-5093-4B7D-BB74-E2010B1E56E2",
          "board" : "EBC718E7-5C1D-4CC4-AD3E-3C1AF1332C51",
          "layoutZOrder" : 7
        },
        {
          "isDigitalNote" : false,
          "index" : 12,
          "noteUUID" : "9D9311AB-D041-4944-A97F-B7881C4BA27C",
          "centerY" : 286.3509223430267,
          "backgroundColor" : {
            "red" : 0.9960784316062927,
            "alpha" : 1,
            "blue" : 0.2039215713739395,
            "green" : 0.8549019694328308
          },
          "contentUUID" : "FD221E7B-CA0A-4927-9B8D-187E1B9D2C53",
          "layoutRotation" : 0.2821238593670314,
          "centerX" : 66.18086002548998,
          "corners" : [
            [
              0.1446078419685364,
              0.3694852888584137
            ],
            [
              0.2291666716337204,
              0.3939951062202454
            ],
            [
              0.2058823555707932,
              0.4791666567325592
            ],
            [
              0.122549019753933,
              0.4552696049213409
            ]
          ],
          "layoutIndex" : 10,
          "enhancementMethod" : "background-separation",
          "positionInitialized" : true,
          "UUID" : "154E2707-E142-40AD-98CE-A05A370394AD",
          "board" : "EBC718E7-5C1D-4CC4-AD3E-3C1AF1332C51",
          "layoutZOrder" : 12
        },
        {
          "isDigitalNote" : false,
          "index" : 16,
          "noteUUID" : "7B0DD7A5-7218-49B1-9BF3-714C78036E12",
          "centerY" : 323.9773789455016,
          "backgroundColor" : {
            "red" : 1,
            "alpha" : 1,
            "blue" : 0.2000000029802322,
            "green" : 0.8509804010391235
          },
          "contentUUID" : "8C7D7413-D074-48F8-9B18-7F69AB019F0B",
          "layoutRotation" : 0.0579063732441029,
          "centerX" : 169.4241691491376,
          "corners" : [
            [
              0.2389705926179886,
              0.4166666567325592
            ],
            [
              0.3235294222831726,
              0.4215686321258545
            ],
            [
              0.3192401826381683,
              0.5073529481887817
            ],
            [
              0.2340686321258545,
              0.5030637383460999
            ]
          ],
          "layoutIndex" : 16,
          "enhancementMethod" : "background-separation",
          "positionInitialized" : true,
          "UUID" : "9344DE02-DD11-48ED-9FE4-AD74936B8DD5",
          "board" : "EBC718E7-5C1D-4CC4-AD3E-3C1AF1332C51",
          "layoutZOrder" : 16
        },
        {
          "isDigitalNote" : false,
          "index" : 17,
          "noteUUID" : "6E418139-A808-4767-9262-017A183D95F9",
          "centerY" : 698.865291808631,
          "backgroundColor" : {
            "red" : 1,
            "alpha" : 1,
            "blue" : 0.1450980454683304,
            "green" : 0.8352941274642944
          },
          "contentUUID" : "51EEA4E7-67B9-4D7F-AC1D-983685375F35",
          "layoutRotation" : 0.02940355093836101,
          "centerX" : 257.8310337026429,
          "corners" : [
            [
              0.3265931308269501,
              0.7947303652763367
            ],
            [
              0.4099264740943909,
              0.7971813678741455
            ],
            [
              0.4080882370471954,
              0.8799019455909729
            ],
            [
              0.325367659330368,
              0.8786764740943909
            ]
          ],
          "layoutIndex" : 37,
          "enhancementMethod" : "background-separation",
          "positionInitialized" : true,
          "UUID" : "8B515162-885E-4DE1-9B26-704D9B494BCE",
          "board" : "EBC718E7-5C1D-4CC4-AD3E-3C1AF1332C51",
          "layoutZOrder" : 17
        },
        {
          "isDigitalNote" : false,
          "index" : 22,
          "noteUUID" : "FBAB7CD8-4FB4-4CE3-BBE4-3F47C2EA7CB8",
          "centerY" : 67.47510633136241,
          "backgroundColor" : {
            "red" : 1,
            "alpha" : 1,
            "blue" : 0.1764705926179886,
            "green" : 0.8549019694328308
          },
          "contentUUID" : "C8929B1B-025E-4EAC-9A4F-8DC0FD1D7394",
          "layoutRotation" : 0.09625341679242334,
          "centerX" : 423.6321400949128,
          "corners" : [
            [
              0.4944852888584137,
              0.1556372493505478
            ],
            [
              0.5833333134651184,
              0.1642156839370728
            ],
            [
              0.5723039507865906,
              0.2542892098426819
            ],
            [
              0.4840686321258545,
              0.2469362765550613
            ]
          ],
          "layoutIndex" : 3,
          "enhancementMethod" : "background-separation",
          "positionInitialized" : true,
          "UUID" : "CD64991D-6543-4361-B026-1785253F0B65",
          "board" : "EBC718E7-5C1D-4CC4-AD3E-3C1AF1332C51",
          "layoutZOrder" : 22
        },
        {
          "isDigitalNote" : false,
          "index" : 2,
          "noteUUID" : "D4A280E8-7BD9-4781-B8F3-A18808B93554",
          "centerY" : 166.1298288565659,
          "backgroundColor" : {
            "red" : 1,
            "alpha" : 1,
            "blue" : 0.2431372553110123,
            "green" : 0.8549019694328308
          },
          "contentUUID" : "A7C1D7B0-A7A4-4C7E-BB6A-74F6584C582E",
          "layoutRotation" : 6.25462139147539,
          "centerX" : 60.21569093817999,
          "corners" : [
            [
              0.125,
              0.2610294222831726
            ],
            [
              0.2107843160629272,
              0.2585784196853638
            ],
            [
              0.2144607901573181,
              0.3474264740943909
            ],
            [
              0.1280637234449387,
              0.3492647111415863
            ]
          ],
          "layoutIndex" : 5,
          "enhancementMethod" : "background-separation",
          "positionInitialized" : true,
          "UUID" : "D8ACDEBF-02D8-40C2-9EE7-318EA450FE4E",
          "board" : "EBC718E7-5C1D-4CC4-AD3E-3C1AF1332C51",
          "layoutZOrder" : 2
        },
        {
          "isDigitalNote" : false,
          "index" : 10,
          "noteUUID" : "92F040B6-40FA-49B8-9733-7D3D64334E1B",
          "centerY" : 330.2484550459141,
          "backgroundColor" : {
            "red" : 1,
            "alpha" : 1,
            "blue" : 0.1568627506494522,
            "green" : 0.8509804010391235
          },
          "contentUUID" : "08027714-CA17-4C6A-A653-7B7D68DC67F5",
          "layoutRotation" : 0.1468229531790399,
          "centerX" : 480.3777115538253,
          "corners" : [
            [
              0.5545343160629272,
              0.419117659330368
            ],
            [
              0.6415441036224365,
              0.4319852888584137
            ],
            [
              0.625612735748291,
              0.5177696347236633
            ],
            [
              0.5398284196853638,
              0.5049019455909729
            ]
          ],
          "layoutIndex" : 19,
          "enhancementMethod" : "background-separation",
          "positionInitialized" : true,
          "UUID" : "5C64CFEF-AE4C-4CA3-B789-7EA868A95C4D",
          "board" : "EBC718E7-5C1D-4CC4-AD3E-3C1AF1332C51",
          "layoutZOrder" : 10
        },
        {
          "isDigitalNote" : false,
          "index" : 11,
          "noteUUID" : "208F549E-D478-4050-8D1A-CE073B91676C",
          "centerY" : 446.1868540685588,
          "backgroundColor" : {
            "red" : 0.8549019694328308,
            "alpha" : 1,
            "blue" : 0.5686274766921997,
            "green" : 0.8078431487083435
          },
          "contentUUID" : "85EC387C-75EA-4E93-8FFF-30B8CB5980AC",
          "layoutRotation" : 0.04672856126724709,
          "centerX" : 480.0718249986251,
          "corners" : [
            [
              0.5490196347236633,
              0.5471813678741455
            ],
            [
              0.6341911554336548,
              0.5511642098426819
            ],
            [
              0.6311274766921997,
              0.6219362616539001
            ],
            [
              0.5459558963775635,
              0.6179534196853638
            ]
          ],
          "layoutIndex" : 24,
          "enhancementMethod" : "background-separation",
          "positionInitialized" : true,
          "UUID" : "69D3D922-23E8-4290-A160-653E96BB6834",
          "board" : "EBC718E7-5C1D-4CC4-AD3E-3C1AF1332C51",
          "layoutZOrder" : 11
        },
        {
          "isDigitalNote" : false,
          "index" : 21,
          "noteUUID" : "BCFFEB01-EE52-4C71-ACCA-0E2404E0ADE3",
          "centerY" : 738.9389896374513,
          "backgroundColor" : {
            "red" : 1,
            "alpha" : 1,
            "blue" : 0.1450980454683304,
            "green" : 0.8352941274642944
          },
          "contentUUID" : "6CA9E128-B6F8-4AD5-820C-11CDBD4A1541",
          "layoutRotation" : 6.268371802858949,
          "centerX" : 170.0359757361054,
          "corners" : [
            [
              0.2377450913190842,
              0.8370097875595093
            ],
            [
              0.3204656839370728,
              0.8357843160629272
            ],
            [
              0.3223039209842682,
              0.9191176295280457
            ],
            [
              0.2377450913190842,
              0.9191176295280457
            ]
          ],
          "layoutIndex" : 36,
          "enhancementMethod" : "background-separation",
          "positionInitialized" : true,
          "UUID" : "588D7B23-591D-4210-8687-4F02805338C9",
          "board" : "EBC718E7-5C1D-4CC4-AD3E-3C1AF1332C51",
          "layoutZOrder" : 21
        },
        {
          "isDigitalNote" : false,
          "index" : 14,
          "noteUUID" : "263F74F3-1125-4243-A0E8-37FEEE45060C",
          "centerY" : 553.1010566484828,
          "backgroundColor" : {
            "red" : 1,
            "alpha" : 1,
            "blue" : 0.2117647081613541,
            "green" : 0.8588235378265381
          },
          "contentUUID" : "4FD47E67-B40C-423E-93B1-B3A64B463CEC",
          "layoutRotation" : 0.1074974525619918,
          "centerX" : 257.5251248297311,
          "corners" : [
            [
              0.3296568691730499,
              0.6427696347236633
            ],
            [
              0.4148284196853638,
              0.6519607901573181
            ],
            [
              0.405637264251709,
              0.7414215803146362
            ],
            [
              0.3186274468898773,
              0.7303921580314636
            ]
          ],
          "layoutIndex" : 27,
          "enhancementMethod" : "background-separation",
          "positionInitialized" : true,
          "UUID" : "894F89AC-9944-4826-ACF4-5B08F36C2D3C",
          "board" : "EBC718E7-5C1D-4CC4-AD3E-3C1AF1332C51",
          "layoutZOrder" : 14
        },
        {
          "isDigitalNote" : false,
          "index" : 8,
          "noteUUID" : "C9B07BFC-2310-45D2-B2B9-A3976DA17270",
          "centerY" : 437.6214948978754,
          "backgroundColor" : {
            "red" : 0.886274516582489,
            "alpha" : 1,
            "blue" : 0.7882353067398071,
            "green" : 0.8823529481887817
          },
          "contentUUID" : "FC58CD77-4ED7-48A2-830D-52E87545B111",
          "layoutRotation" : 0.01111048578909006,
          "centerX" : 262.7255310338081,
          "corners" : [
            [
              0.3449755012989044,
              0.5533088445663452
            ],
            [
              0.4001225531101227,
              0.5539215803146362
            ],
            [
              0.4001225531101227,
              0.5986519455909729
            ],
            [
              0.344362735748291,
              0.5980392098426819
            ]
          ],
          "layoutIndex" : 22,
          "enhancementMethod" : "background-separation",
          "positionInitialized" : true,
          "UUID" : "0F1B9913-771C-46D3-8AFD-8E4B428781DE",
          "board" : "EBC718E7-5C1D-4CC4-AD3E-3C1AF1332C51",
          "layoutZOrder" : 8
        },
        {
          "isDigitalNote" : false,
          "index" : 18,
          "noteUUID" : "C44D09A8-673B-4E34-837D-CBF54D011C5F",
          "centerY" : 220.4281665283701,
          "backgroundColor" : {
            "red" : 0.9960784316062927,
            "alpha" : 1,
            "blue" : 0.2039215713739395,
            "green" : 0.8549019694328308
          },
          "contentUUID" : "26AE49F8-46E5-43B1-AE43-015802998EE1",
          "layoutRotation" : 6.255794985345484,
          "centerX" : 487.7194649898104,
          "corners" : [
            [
              0.5520833134651184,
              0.3161764740943909
            ],
            [
              0.6415441036224365,
              0.3137255012989044
            ],
            [
              0.6433823704719543,
              0.4001225531101227
            ],
            [
              0.5539215803146362,
              0.4037990272045135
            ]
          ],
          "layoutIndex" : 14,
          "enhancementMethod" : "background-separation",
          "positionInitialized" : true,
          "UUID" : "26B059BF-E2D4-4D91-A045-492466E4326F",
          "board" : "EBC718E7-5C1D-4CC4-AD3E-3C1AF1332C51",
          "layoutZOrder" : 18
        }
      ],
      "width" : 556,
      "layoutType" : "free-form",
      "positionY" : -52.24478903757018,
      "name" : "5946"
    }
  ]
}, function () {
      console.log('finished populating postboards');
    }
  );
});
