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


    //unlock layers
          for (var i = 0; i < curDoc.layers.length; i++) {
            if (curDoc.layers.item(i).locked == true) {
              curDoc.layers.item(i).locked = false;
            };
          }


    // зачищаем слои  переделать в поиск пустого слоя и удаления его

          var delLayer1 = curDoc.layers.item("Guides");
          var delLayer2 = curDoc.layers.item("Device Bezel");
          var delLayer3 = curDoc.layers.item("Device Portrait");
          var delLayer4 = curDoc.layers.item("Device Landscape");

          delLayer1.remove();
          delLayer2.remove();
          delLayer3.remove();
          delLayer4.remove();

    // Размеры  исходный, желаемый, приведенное число (px)

        var preResize = curDocPref.pageWidth;
        var resizeWidth  = 768;
        var scaleFactor = 1.8331061841078287;
        var horTrans = -174.52;
        var verTrans = -1861.299;
        var resizePageWidth = resizeWidth - preResize;

    // Матрица преобразования

    var myScaleMatrix = app.transformationMatrices.add({
          horizontalScaleFactor: scaleFactor,
          verticalScaleFactor: scaleFactor,
          horizontalTranslation: horTrans,
          verticalTranslation: verTrans
        });

    // Устанавлемые поля и сетка в px

    var newMargins = 48;
    var newCollums = 4;
    var newGutter = 32;

    // Расставляем пустые маркеры

    makeMark();
    makeGroup();

    // приводим размеры страницы

    with(curDocPref){
      pageWidth = Math.round((curDocPref.pageWidth - curDocMarginSum) * scaleFactor);
      pageHeight = Math.round(curDocPref.pageHeight * scaleFactor + 0.5);
    }

    myTransform(myScaleMatrix);
    makeUnGroup();


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
      with(curDoc.gridPreferences){
        horizontalGridlineDivision = 16;
        horizontalGridlineSubdivision = 0;
        verticalGridlineDivision = 16;
        verticalGridlineSubdivision = 0;
      }

      // Сохранение в новый файл
      var f = new File(curDoc.filePath+"\\"+curDoc.name+"_DPS");
      curDoc.save(f.fsName);
      alert("Документ сохранен в \"" + f.fsName + "\"");

      function myTransform(myTransformMatrix)
      {
        // трансформ
        for (var i = 0; i < curDoc.pages.length; i++) {
          for (var j = 0; j < curDoc.pages.item(i).pageItems.length; j++) {
            curDoc.pages.item(i).pageItems.item(j).transform (
                                                        CoordinateSpaces.INNER_COORDINATES,
                                                        // AnchorPoint.CENTER_ANCHOR,
                                                        AnchorPoint.topLeftAnchor,
                                                        myTransformMatrix);
          }
        }
      }

      function makeMark() {
        var myX = 69.732;
        var myY = 0;
        var myColorNone = curDoc.swatches.item("None");

        for (var i = 0; i < curDoc.pages.length; i++) {
          var myRectangle = curDoc.pages.item(i).rectangles.add(
              {fillColor: myColorNone, strokeColor: myColorNone,
              geometricBounds: [myY, myX, (myY +10), (myX + 10)]});
        }
      }

      function makeGroup() {
        // групируем
        for (var i = 0; i < curDoc.pages.length; i++) {
          if (curDoc.pages.item(i).pageItems.length == 1){
            continue;
          }
          else {
            var myArray = new Array;
            for (var j = 0; j < curDoc.pages.item(i).pageItems.length; j++) {
              myArray.push(curDoc.pages.item(i).pageItems.item(j));
            }
            curDoc.pages.item(i).groups.add(myArray);
          }
        }
      }
      
      function makeUnGroup() {
        for (var i = 0; i < curDoc.pages.length; i++) {
          if (curDoc.pages.item(i).groups.length > 0){
            curDoc.pages.item(i).pageItems.item(0).ungroup();
          }
          else {
            continue;
          }
        }
      }
