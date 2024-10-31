import { ref, onMounted, onUnmounted } from 'vue'

export function useFormatterInt(data) {
    const formatter =  new Intl.NumberFormat("de-DE"); 
const formattedInt = formatter.format(data); 
return formattedInt
}

// let formatter = new Intl.NumberFormat("de-DE");
