#target indesign

if (app.documents.length==0)
{
      alert("Нет открытых документов. Откройте нужный документ и запустите скрипт еще раз.");
      exit();
}

    var idPixels = 0x7A706978;
    curDocViewPref.horizontalMeasurementUnits =  idPixels;   
    curDocViewPref.verticalMeasurementUnits =  idPixels;

    var resizeNumber  =  ;
