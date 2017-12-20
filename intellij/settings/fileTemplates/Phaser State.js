#parse("File Header.java")
#set ($NewName = $NAME.substring(0,1).toUpperCase() + $NAME.substring(1))

let ${ProjectName}  = ${ProjectName} || {};
     
${ProjectName}.${NewName} = function() {
    Phaser.State.call(this);  
      
    this.prefabClasses = {
        'sprite': ${ProjectName}.Prefab.prototype.constructor
    };
};
    
${ProjectName}.${NewName}.prototype = Object.create(Phaser.State.prototype);
${ProjectName}.${NewName}.prototype.constructor = ${ProjectName}.${NewName};
    
${ProjectName}.${NewName}.prototype.init = function(data) {
    this.data = data;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
};
    
${ProjectName}.${NewName}.prototype.create = function() {
    this.game.time.advancedTiming = true;
    
    this.groups = {};
    this.prefabs = {};
    
    this.data.groups.forEach(groupName => (this.groups[groupName] = this.game.add.group()), this);
    for(let prefabName in this.data.prefabs) {
        if(this.data.prefabs.hasOwnProperty(prefabName)) {
            this.createPrefab(prefabName, this.data.prefabs[prefabName]);
        }
    }
};
    
        
${ProjectName}.${NewName}.prototype.createPrefab = function (prefabName, properties) {
    if (this.prefabClasses.hasOwnProperty(properties.type)) {
        const position = new Phaser.Point(properties.position.x, properties.position.y);
        const prefab = new this.prefabClasses[properties.type](this, prefabName, position, properties.properties);

        this.prefabs[prefabName] = prefab;
    }
};

${ProjectName}.${NewName}.prototype.update = function () {
};
