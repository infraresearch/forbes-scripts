//
// Дописать ветку - определить короткую страницу и превести ее к 1024пх по высоте (фотопроект и тп)
//
//  


#target indesign

if (app.documents.length==0)
{
      alert("Нет открытых документов. Откройте нужный документ и запустите скрипт еще раз.");
      exit();
}


    var curDoc = app.activeDocument;
    var curDocPref =  curDoc.documentPreferences;

    // Перевод мм в пиксели
      var curDocViewPref = curDoc.viewPreferences;
        var idPixels = 0x7A706978;
        curDocViewPref.horizontalMeasurementUnits = idPixels;
        curDocViewPref.verticalMeasurementUnits = idPixels;

    // значение полей и сетки
    var curDocMarginPref = curDoc.marginPreferences;
    var curDocMarginLeft = curDoc.pages.item(0).marginPreferences.left;
    var curDocMarginRight = curDoc.pages.item(0).marginPreferences.right;
    var curDocMarginSum = curDocMarginLeft + curDocMarginRight;
    var curDocGridPref = curDoc.gridPreferences;

    // Размеры  исходный, желаемый, приведенное число (px)

        var preResize = curDocPref.pageWidth;
        var resizeWidth  = 768;
        var scaleFactor = 1.8331061841078287;
        var resizePageWidth = resizeWidth - preResize;

    // загоним все объекты в массив после чего вычислим новые координаты-размеры
    for (var i = 0; i < curDoc.pages.length; i++) {
      with(curDoc.pages.item(i)){

      }
    }

    // Устанавлемые поля и сетка в px

    var newMargins = 48;
    var newCollums = 4;
    var newGutter = 12;

    // приводим размеры страницы

    with(curDocPref){
      pageWidth = Math.round((curDocPref.pageWidth - curDocMarginSum) * scaleFactor);
      pageHeight = Math.round(curDocPref.pageHeight * scaleFactor + 0.5);
    }

    // ставим новые поля и сетку (px) для каждой страницы

    for (var i = 0; i < curDoc.pages.length; i++) {
      with(curDoc.pages.item(i).marginPreferences){
        top = newMargins;
        bottom = newMargins;
        left = newMargins;
        right = newMargins;
        columnCount = newCollums;
        columnGutter = newGutter;
      }
    }
