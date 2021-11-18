class Debug {

    static id = 'debug';

    static preload = true;

    static postload = false;

    static jqueryExtend = {
        debug:Debug,
    };
    
    static jqueryFnExtend = null;
    
    static _module = null;
    
    static _isLoaded() {
        return True;
    }


    static output() {
        
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