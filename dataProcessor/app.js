'use strict';

/* global require */

var fs = require('fs');

var
  TIMESTAMP_INDEX    = 0,
  OWNED_SINCE_INDEX  = 1,
  GENDER_INDEX       = 4,
  AGE_GROUP_INDEX    = 5,
  GAME_MODE_INDEX    = 8,
  PRIMARY_ROLE_INDEX = 2,
  OTHER_ROLES_INDEX  = 3,
  PRIMARY_SHIP_INDEX = 6,
  OTHER_SHIPS_INDEX  = 7,
  FACTION_INDEX      = 9;

var
  INPUT_FILE = 'input.tsv',
  OUTPUT_FILE = 'output.json';

var processData = function () {
  var csv   = fs.readFileSync(INPUT_FILE, {encoding: 'UTF-8'});
  var lines = csv.split('\n');
  var data  = [];

  for (var i = 1; i < lines.length - 1; i++) {
    var line = lines[i].split('\t');

    var record = {};
    record._id = i;
    record.timestamp  = new Date(line[TIMESTAMP_INDEX]) || '';

    parseBasicData(record, line);
    parseRoleData(record, line);
    parseShipData(record, line);
    parseFactionData(record, line);

    data.push(record);
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2), {encoding: 'UTF-8'} );
};

var parseBasicData = function (record, line) {
  record.basic = {};
  record.basic.ownedSince = line[OWNED_SINCE_INDEX] ? line[OWNED_SINCE_INDEX].replace('since ','') : '';
  record.basic.gender     = line[GENDER_INDEX]      ? line[GENDER_INDEX]                           : '';
  record.basic.ageGroup   = line[AGE_GROUP_INDEX]   ? line[AGE_GROUP_INDEX]                        : '';
  record.basic.gameMode   = line[GAME_MODE_INDEX]   ? line[GAME_MODE_INDEX]                        : '';
};

var parseRoleData = function (record, line) {
  record.roles = {};
  record.roles.primary = line[PRIMARY_ROLE_INDEX] ? line[PRIMARY_ROLE_INDEX]            : '';
  record.roles.others  = line[OTHER_ROLES_INDEX]  ? line[OTHER_ROLES_INDEX].split(', ') : [];

  removePrimaryFromOthers(record.roles.primary, record.roles.others);
};

var parseShipData = function (record, line) {
  record.ships = {};
  record.ships.primary = line[PRIMARY_SHIP_INDEX] ? line[PRIMARY_SHIP_INDEX]            : '';
  record.ships.others  = line[OTHER_SHIPS_INDEX]  ? line[OTHER_SHIPS_INDEX].split(', ') : [];

  removePrimaryFromOthers(record.ships.primary, record.ships.others);
};

var parseFactionData = function (record, line) {
  record.factions = {};
  record.factions.supported = line[FACTION_INDEX] ? line[FACTION_INDEX] : '';
};

var removePrimaryFromOthers = function (primary, others) {
  var indexOfPrimary = others.indexOf(primary);

  if(indexOfPrimary !== -1) {
    others.splice(indexOfPrimary, 1);
  }
};

processData();





