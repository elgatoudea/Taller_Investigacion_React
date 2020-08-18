export const esNombre = (value)=>{
    return !/[^A-Za-z\s\,]/.test(value);
}
  
export const esCorreo = (value)=>{
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(value);
}

export const esDoc = (value)=>{
    return !/[^A-Za-z0-9\s\,]/.test(value);
}

export const esFecha = (value)=>{
    return !/^\w+(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/.test(value);
}

