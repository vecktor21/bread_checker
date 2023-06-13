const onchangeHandler=(e)=>{
    var res = "value of characteristic \""
    const label = document.getElementById("standartValueLabel")
    var selectedStandart = findSelectedStandart()
    switch (selectedStandart) {
        case 0:
            res+="Moisture Content\""
            break;
    
        case 1:
            res+="pH of aqueous extract\""
            break;

        case 2:
            res+="Acid insoluble ash\""
            break;

        case 3:
            res+="Crude fibre\""
            break;

        case 4:
            res+="Milk solids\""
            break;

        case 5:
            res+="Fat\""
            break;
                    
        case 6:
            res+="Total solids\""
            break;                                            
        default:
            alert("ошибка данных")
            break;
    } 
    res+=":"
    label.innerHTML=res
}

const  onclickHandler = ()=>{
    let selectedStandart
    let selectedBread
    let standartValue
    try{
        selectedStandart = findSelectedStandart()
        selectedBread = findSelectedBread()
        standartValue = findStandartValue()
    }
    catch(e){
        alert("ошибка")
    }
    var res = false
    switch (selectedStandart) {
        case 0:
            res=ms610Standart(selectedBread,standartValue)
            break;
    
        case 1:
            res=ms1635Standart(selectedBread,standartValue)
            break;

        case 2:
            res=AnnexBStandart(selectedBread,standartValue)
            break;

        case 3:
            res=ms144Standart(selectedBread,standartValue)
            break;

        case 4:
            res=AnnexCStandart(selectedBread,standartValue)
            break;

        case 5:
            res=AnnexDStandart(selectedBread,standartValue)
            break;
                    
        case 6:
            res=TotalSolidstandart(selectedBread,standartValue)
            break;                                            
        default:
            alert("ошибка данных")
            break;
    }
    showResult(res)
}

class ResultModel{
    isMatches = false;
    standartName = ""
    paramName = ""
    paramValues = 0
    value = 0
    constructor(isMatch, standart, param, paramVal, val){
        this.isMatches=isMatch;
        this.standartName=standart;
        this.paramName=param;
        this.paramValues=paramVal;
        this.value=val
    }
}

const showResult=(res)=>{
    console.log(res);
    const resultDiv = document.getElementById("result")
    const className = `visible result`
    const paramValues = `${Array.isArray(res.paramValues) ? `MORE than ${res.paramValues[0]} and LESS than ${res.paramValues[1]}` : `${res.paramValues}`}`
    const isMatch = `${res.isMatches ? "conforms to the standard": "is NOT up to standard"}`
    const text = `According to the standard ${res.standartName}, the content of ${res.paramName} must be: ${paramValues}. <Br> Your sample contains ${res.value} units. That ${isMatch}`
    resultDiv.className = `${className} ${res.isMatches ? "match": "not_match"}`
    resultDiv.innerHTML = text
    
}

const findSelectedStandart = ()=>{
    return Number(document.getElementById("standart").options[document.getElementById("standart").selectedIndex].value)
}

const findSelectedBread = ()=>{
    return Number(document.getElementById("bread").options[document.getElementById("bread").selectedIndex].value)
}

const findStandartValue = ()=>{
    return Number(document.getElementById("standartValue").value)
}

const ms610Standart=(bread,val)=>{
    const params = [40.0,40.0,40.0,40.0,[12.0,14.0],40.0]
    const min_max_comparison_ids = [5]
    var res = false
    if(min_max_comparison_ids.includes(bread)){
        
        res = val >= params[bread][0] && val <= params[bread][1] 
    }
    else{
        res = val == params[bread]
    }
    return new ResultModel(res, "MS 610", "Moisture Content", params[bread], val)
}

const ms1635Standart=(bread,val)=>{
    const params = [[5.3,6.0],[5.3,6.0],[5.3,6.0],[5.3,6.0],[5.3,6.0],[5.3,6.0]]
    const min_max_comparison_ids = [0,1,2,3,4,5]
    var res = false
    if(min_max_comparison_ids.includes(bread)){
        
        res = val >= params[bread][0] && val <= params[bread][1] 
    }
    else{
        res = val == params[bread]
    }
    return new ResultModel(res, "MS 1635", "pH of aqueous extract", params[bread], val)
}

const AnnexBStandart=(bread,val)=>{
    const params = [0.2,0.2,0.2,0.2,0.2,0.2]
    const min_max_comparison_ids = [-1]
    var res = false
    if(min_max_comparison_ids.includes(bread)){
        
        res = val >= params[bread][0] && val <= params[bread][1] 
    }
    else{
        res = val == params[bread]
    }
    return new ResultModel(res, "Annex B", "Acid insoluble ash", params[bread], val)
}

const ms144Standart=(bread,val)=>{
    const params = [[0,0.3],[0,0.6],[0,1.0],[0,0.3],[3.5,4.0],0]
    const min_max_comparison_ids = [0,1,2,3,4]
    var res = false
    if(min_max_comparison_ids.includes(bread)){
        
        res = val >= params[bread][0] && val <= params[bread][1] 
    }
    else{
        res = val == params[bread]
    }
    return new ResultModel(res, "MS 144", "Crude fibre", params[bread], val)
}

const AnnexCStandart=(bread,val)=>{
    const params = [0,0,0,3.6,0,0]
    const min_max_comparison_ids = [-1]
    var res = false
    if(min_max_comparison_ids.includes(bread)){
        
        res = val >= params[bread][0] && val <= params[bread][1] 
    }
    else{
        res = val == params[bread]
    }
    return new ResultModel(res, "Annex C", "Milk solids", params[bread], val)
}

const AnnexDStandart=(bread,val)=>{
    const params = [0.7,2.0,0.7,2.0,0,0]
    const min_max_comparison_ids = [-1]
    var res = false
    if(min_max_comparison_ids.includes(bread)){
        
        res = val >= params[bread][0] && val <= params[bread][1] 
    }
    else{
        res = val == params[bread]
    }
    return new ResultModel(res, "Annex D", "Fat", params[bread], val)
}

const TotalSolidstandart=(bread,val)=>{
    const params = [60.0,60.0,60.0,60.0,0,0]
    const min_max_comparison_ids = [-1]
    var res = false
    if(min_max_comparison_ids.includes(bread)){
        
        res = val >= params[bread][0] && val <= params[bread][1] 
    }
    else{
        res = val == params[bread]
    }
    return new ResultModel(res, "Total solids", "Total solids", params[bread], val)
}

