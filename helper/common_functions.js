
export const dataWithFiles = (data) => {
    const formDataWithFiles = new FormData()
  
          if (formDataWithFiles) {
            // axios will automatically set the content-type to multipart/form-data if the
            // data param is a FormData object
            // otherwise, it will use application/json
            // (study the Dev Tools > Network tab > XHR tab headers)
            Object.keys(data).forEach(field =>
              formDataWithFiles.append(field, data[field])
            )
          }
  
          console.log(formDataWithFiles,"fromfiles")
           
          return formDataWithFiles
  }
 
// export const dataWithFiles = (data)(
//   (f) => (fd) => (pk) => (d) => {
//     if (d instanceof Object) {
//       Object.keys(d).forEach((k) => {
//         const v = d[k]
//         if (pk) k = `${pk}[${k}]`
//         if (v instanceof Object && !(v instanceof Date) && !(v instanceof File))
//           return f(fd)(k)(v)

//         fd.append(k, v)
//       })
//     }
//     console.log(fd);
//     return fd
//   }
// )(new FormData())()



  // const objKeys = Object.keys(data)
  
  //     objKeys.forEach((e)=>{
  //       if(data[e] === ''){
  //         delete data[e]
  //       }
  //     })

//  export  const createFormData = ( data,image_url) => {
//     const dat = new FormData();

//      let filename = image_url.split('/').pop();

 
//    // Infer the type of the image
//    let match = /\.(\w+)$/.exec(filename);
//    let type = match ? `image/${match[1]}` : `image`;
  
//     dat.append('image_url', {
//       name: filename,
//       type: type,
//       uri:
//         Platform.OS === 'android' ? image_url : image_url.replace('file://', ''),
//     });
  
//     Object.keys(data).forEach((key) => {
//       dat.append(key, data[key]);
//     });
    
     
//     console.log(dat)
//     return dat;
//   };