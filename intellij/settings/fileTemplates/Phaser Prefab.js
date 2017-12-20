#parse("File Header.java")
#set ($NEWNAME = $NAME.substring(0,1).toUpperCase() + $NAME.substring(1))

let ${ProjectName}  = ${ProjectName} || {};
     
${ProjectName}.${NEWNAME} = function(state, name, position, properties) {
    ${ProjectName}.${BaseClass}.call(this, state, name, position, properties);
};
    
${ProjectName}.${NEWNAME}.prototype = Object.create(${ProjectName}.${BaseClass}.prototype);
${ProjectName}.${NEWNAME}.prototype.constructor = ${ProjectName}.${NEWNAME};
