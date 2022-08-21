
const storager =  window.localStorage
    
class Storager {

    static get = (key) => {
        const data = storager.getItem(key)
        return (data !== null) ? JSON.parse(data) : {}
    }
    
    static set = (key, value) => {
        console.log({key, value})
        storager.setItem(key, JSON.stringify(value))
    }
    
    static remove = (key) => {
        storager.removeItem(key)
    }
    
    static clear = () => {
        storager.clear()
    }
}

export default Storager