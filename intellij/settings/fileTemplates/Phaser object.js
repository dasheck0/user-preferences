#parse("File Header.java")
#set ($className = $NAME.toUpperCase())

'use strict';

function ${NAME}(game) {
    this.game = game;

    this.create();
}

${NAME}.prototype = {
    create: function () {
    },

    update: function () {
    },

    settings: function () {
        return {};
    },

    rules: function () {
        return window['phaser'].Rules;
    }
};