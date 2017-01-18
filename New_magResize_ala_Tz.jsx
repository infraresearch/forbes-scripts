#target indesign

//  Скрипт для конвертации Mag+ >> ADPS, согласно инструкции TZ_Forbes.pdf

// Изменяем параметры страницы

//  Параметры:
//  Единицы измерения - мм;
//  Все поля = 0 мм;
//  Ширина страницы = 147,797 мм; 
//     Ширину ставим по центральной верхней точке;
//  Высота страницы равна высоте всех выделенных элементов.

// Переделываем 

// 1. внешние ссылки
// 2. Object state
// 3. Scrollable frames


if (app.documents.length==0) {
      alert("Нет открытых документов. Откройте нужный документ и запустите скрипт еще раз.");
      exit();
    }

    var curDoc = app.activeDocument;
    var curDocPref =  curDoc.documentPreferences;
    var curDocPrefHeight = curDocPref.pageHeight;

    // значение полей и сетки

    var curDocMarginPref = curDoc.marginPreferences;
    var curDocMarginLeft = curDoc.pages.item(0).marginPreferences.left;
    var curDocMarginRight = curDoc.pages.item(0).marginPreferences.right;
    var curDocMarginSum = curDocMarginLeft + curDocMarginRight;
    var curDocGridPref = curDoc.gridPreferences;


    // Перевод мм 

    var curDocViewPref = curDoc.viewPreferences;
      with(curDocViewPref) {
        MeasurementUnits.millimeters;
      }


    //unlock layers

          for (var i = 0; i < curDoc.layers.length; i++) {
            if (curDoc.layers.item(i).locked == true) {
              curDoc.layers.item(i).locked = false;
            };
          }

    // зачищаем слои переделать в поиск пустого слоя и удаления его

        var delLayer1 = curDoc.layers.item("Guides");
        var delLayer2 = curDoc.layers.item("Device bezel");
        var delLayer3 = curDoc.layers.item("Device portrait");
        var delLayer4 = curDoc.layers.item("Device landscape");

        delLayer1.remove();
        delLayer2.remove();
        delLayer3.remove();
        delLayer4.remove();

    // Размеры (мм)

        var preResize = curDocPref.pageWidth;
        var resizeWidth = (147.797 / 197);
        var resizeHeigth = 0;


    // Устанавлем поля

    var newMargins = 0;


    // Расставляем пустые маркеры

    makeMark();
    makeGroup();

    // ставим новые поля для каждой страницы

    for (var i = 0; i < curDoc.pages.length; i++) {
      with(curDoc.pages.item(i).marginPreferences){
        top = newMargins;
        bottom = newMargins;
        left = newMargins;
        right = newMargins;
      }
    }

    // приводим размеры страницы

    makeHeightAndWidth();

    //Разгруппируем объекты

    makeUnGroup();

    // Сохранение в новый файл

    var f = new File(curDoc.filePath+"//"+"_DPS_"+curDoc.name); //слеш правильно - важно
    curDoc.save(f);
    alert("Документ сохранен в \"" + f.fsName + "\"");




  //////////////////
  //              //
  //   ФУНКИЦИИ   //
  //              //
  //////////////////


  function makeHeightAndWidth() {
          for (var i = 0; i < curDoc.pages.length; i++) {
          if (curDoc.pages.item(i).groups.length > 0){
            resizeHeigth = curDoc.pages.item(i).pageItems.item(0).geometricBounds[2];
            var resizeHeigthM = resizeHeigth / curDocPrefHeight;
            curDoc.pages.item(i).resize(
                        CoordinateSpaces.INNER_COORDINATES, 
                        AnchorPoint.topCenterAnchor, 
                        ResizeMethods.MULTIPLYING_CURRENT_DIMENSIONS_BY,
                        [resizeWidth, resizeHeigthM] );
          }
          else {
            continue;
          }
        }
      }


  function makeMark() {
        var myX = 0;
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