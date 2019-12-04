(function init(){
    loadJSON();
})();


function loadJSON() {
    let request = new XMLHttpRequest();
    let requestURL = 'json/qib2.json';
    
    request.overrideMimeType( "application/json" );
    request.open( 'GET', requestURL, true );
    request.responseType = 'json';
    request.send();
    
    request.onload = function() {
        const data = request.response;
        const parsedJSON = parseJSONObject( data );
    }
}

function parseJSONObject( jsonObj ) {
    let l = jsonObj.length;
    let obj = [];
    
    for( let i = 0; i < l; i++ ) {
        obj.push( jsonObj[i] );
    }
    
    parseGroups( obj );
    
    return obj;
}

function parseGroups( groupList ) {
    let l = groupList.length;
    let parentId;
    let group;
    let button;
    
    for( let i = 0; i < l; i++ ) {
        parentId = i;
        
        group = createGroup( groupList[i]['ButtonText'], i );
        group.draw();
        
        //console.log( groupList[i]['ButtonText'] + " id: " + groupList[i]['QuickButtonGroupOid'] );
        
        const groupButtons = groupList[i]['Buttons'];
        for( const buttons of groupButtons ) {
            button = createButton( buttons['ButtonText'], parentId );
            button.draw();
            
            //console.log( "  > " + buttons['ButtonText'] + " id: " + buttons['QuickButtonOid'] );
        }
    }
    //console.log( groupList );    
}


function createGroup( name, idNum ) {
    let parentContainer = document.querySelector( '#control-mod' );
    let groupContainer = document.createElement( 'div' );
    let groupContent = document.createElement( 'div' );
    let collapseButton = document.createElement( 'button' );
    
    return {
        draw: function() {
            groupContainer.classList.add( 'group' );
            collapseButton.classList.add( 'collapse-btn' );
            groupContent.classList.add( 'group-cont' );
            groupContent.classList.add( 'collapse-panel' );
            groupContent.setAttribute( 'id', 'grp-' + idNum );
            
            collapseButton.innerHTML = name;
            
            parentContainer.appendChild( groupContainer );
            groupContainer.appendChild( collapseButton );
            groupContainer.appendChild( groupContent );
            
            
            collapseButton.addEventListener('click', function() {
                this.classList.toggle( 'active' );
                if( groupContent.style.maxHeight ) {
                    groupContent.style.maxHeight = null;
                } else {
                    groupContent.style.maxHeight = groupContent.scrollHeight + "px";
                }
            });
        }   
    }
}


function createButton( name, parentId ) {
    const controlButton = document.createElement( 'button' );
    const parentContainer = document.querySelector( '#grp-' + parentId );
    
    return {
        draw: function() {
            controlButton.classList.add( 'button' );
            controlButton.setAttribute( 'type', 'button' );
            controlButton.setAttribute( 'name', name );
            controlButton.innerHTML = name;

            parentContainer.appendChild( controlButton );

            controlButton.addEventListener('click', function() {
                console.log(this.name);
            });
        }
    }
}
