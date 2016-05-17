#target indesign

if (app.documents.length==0)
{
      alert("Нет открытых документов. Откройте нужный документ и запустите скрипт еще раз.");
      exit();
}

    var curDoc = app.activeDocument;
    var curDocPref =  curDoc.documentPreferences;
    var curDocMarginPref =  curDoc.marginPreferences;
    var curDocGridPref = curDoc.gridPreferences;
    var curDocViewPref = curDoc.viewPreferences;


    // Перевод мм в пиксели

    var idPixels = 0x7A706978;
    curDocViewPref.horizontalMeasurementUnits =  idPixels;
    curDocViewPref.verticalMeasurementUnits =  idPixels;

    // Размеры  исходный, желаемый, приведенное число

    var preResize = curDocPref.pageWidth;
    var resizeWidth  = 768;
    var resizeNumber = resizeWidth / preResize;
    var resizePageWidth = resizeWidth - preResize;




    // переводим размеры страницы

    curDocPref.pageWidth = curDocPref.pageWidth + resizePageWidth;
    curDocPref.pageHeigth = curDocPref.pageWidth * resizeNumber;

    // Вычислить высоту страницы дпс как высоту все объектов на странице магплюс
