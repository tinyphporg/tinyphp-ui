class Debug {

    id = 'debug';

    preload = true;

    postload = false;

    jqueryExtend = {
        debug:this,
    };
    
    jqueryFnExtend = {};
    
    module = null;


    output() {
        
        console.log(window.hasOwnProperty('__tinyphp_debuginfo'))
        if (!window.hasOwnProperty('__tinyphp_debuginfo'))
        {
            return;
        }
        let debuginfoString = window.__tinyphp_debuginfo;
        debuginfoString = JSON.parse(debuginfoString.base64Decode());
        for(let i in debuginfoString)
        {
            if (debuginfoString.hasOwnProperty(i))
            {
                console.log(debuginfoString[i]);
            }
        }
    }
}

$(()=>{Debug.output();});

export default Debug;