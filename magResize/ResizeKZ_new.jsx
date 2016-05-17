#target indesign

	if (app.documents.length==0) 
	{
        alert("Нет открытых документов. Откройте нужный документ и запустите скрипт еще раз.");
        exit();
	}

    var idPixels = 0x7A706978;
    var addWidth = 32;
    var addHeight = 256;

    var curDoc = app.activeDocument;
	
    var curDocPref =  curDoc.documentPreferences;
    var curDocMarginPref =  curDoc.marginPreferences;
    var curDocGridPref = curDoc.gridPreferences;
    var curDocViewPref = curDoc.viewPreferences;
    
    curDocViewPref.horizontalMeasurementUnits =  idPixels;
    curDocViewPref.verticalMeasurementUnits =  idPixels;
    
    curDocPref.pageHeight = curDocPref.pageHeight + addHeight;
    curDocPref.pageWidth = curDocPref.pageWidth + addWidth;
    curDocMarginPref.top = curDocMarginPref.top + addHeight/2;
    curDocMarginPref.bottom = curDocMarginPref.bottom + addHeight/2;
    curDocMarginPref.right = curDocMarginPref.right + addWidth/2;
    curDocMarginPref.left = curDocMarginPref.left + addWidth/2;
    curDocGridPref.baselineStart = "32px";
    
    var pages = curDoc.pages;
    for (var i = 0; i < pages.length; i++){
        var mp = pages[i].marginPreferences;
        mp.top = mp.top + addHeight/2;
        mp.bottom = mp.bottom + addHeight/2;
        mp.right = mp.right + addWidth/2;
        mp.left = mp.left + addWidth/2;

        var rec = pages[i].rectangles.add();
        rec.fillColor = "Black";
        rec.fillTint = 100;
        rec.strokeColor = "None";
        rec.visibleBounds = [0, 0,  addHeight/2, curDocPref.pageWidth];
        
        var rec = pages[i].rectangles.add();
        rec.fillColor = "Black";
        rec.fillTint = 100;
        rec.strokeColor = "None";
        rec.visibleBounds = [curDocPref.pageHeight - addHeight/2, 0, curDocPref.pageHeight, curDocPref.pageWidth];
     }
    var f = new File(curDoc.filePath+"\\a_"+curDoc.name);
    curDoc.save(f.fsName);
    //alert("Документ сохранен в \"" + f.fsName + "\"");
    
    