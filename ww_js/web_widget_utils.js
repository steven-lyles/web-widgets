
/======================================================================================
export function gen_unique_id_from(str) {
    var hash = Math.random() * (10 - 0) + 0;
    var i = 0;
    var char = "";

    if (str.length !== 0) {
        for (i = 0; i < str.length; i++) {
            char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
    }
    return Math.abs(hash);
}