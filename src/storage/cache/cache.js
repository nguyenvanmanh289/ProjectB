import Cache from 'cache';

const cacheob = new Cache();
class cache {
    static addCache = (key,value,ttl)=>{
        cacheob.put(key,value,ttl);
    }

    static getCache = (key)=>{
        return cacheob.get(key);
    }
}

export default cache;