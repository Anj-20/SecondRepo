
load(scripting.getScriptsDirectory().toString()+'/Examples/Javascript/Utility.js')

var imports = new JavaImporter(javax.imageio.ImageIO);  // java.io.File, java.io.IOException, java.awt.image.BufferedImage
// var boardLocations=gui.getMachineControls().getJobPanel().getJob().getJobPlacementsPanel().getplacementLocation();



var camera = machine.defaultHead.defaultCamera;


//var placementLocation = Utils2D.calculateBoardPlacementLocationInverse(boardLocation, camera.getLocation());
with(imports){
    task(function(){
        var placements = gui.getJobTab().getJobPlacementsPanel().getSelections();
    // Move the camera placement location.
    var placement=placements[0];
    camera.moveTo(placement.getLocation());
    
    
    //var placementLocation = Utils2D.calculateBoardPlacementLocation(boardLocation, placement.getLocation());
                        
    // Settle the camera and capture an image.
    var image = camera.settleAndCapture();

    //print(image);
    
    var t = new Date(); // get current time
    var timeStr = t.toISOString(); // e.g. 2011-12-19T15:28:46.493Z
    
    timeStr = timeStr.replace('T','_');
    timeStr = timeStr.replace(':','-');
    timeStr = timeStr.replace(':','-');
    timeStr = timeStr.slice(0,-5); // remove milli seconds
    // timeStr is now: 2011-12-19_15-28-46
    
    var fileName = String('/home/user/.openpnp/vision/log/placements/' + timeStr + '_' + placement.getId() + '.png')       
     
    print('save placement image to ' + fileName);
    // Write the image to a file based on the placement name.
    var file = new java.io.File(fileName);
    ImageIO.write(image, "PNG", file);
    });
    
}














// // Import the necessary OpenPnP classes
// var ImageCapture = Packages.org.openpnp.capture.ImageCapture;
// var Part = Packages.org.openpnp.model.Part;

// // Define the path where you want to save the images
// var imagePath = "/home/user/.openpnp/vision/log/placements/";

// // Loop through all placed parts and capture images
// var parts = machine.getParts();
// for (var i = 0; i < parts.size(); i++) {
//     var part = parts.get(i);
    
//     // Check if the part has been placed
//     if (part.getState() == Part.PlacementState.PLACED) {
//         // Capture an image of the placed part
//         var image = ImageCapture.capture(part);
        
//         // Generate a unique filename for the image (e.g., using part ID)
//         var filename = imagePath + "part_" + part.getId() + ".png";
        
//         // Save the image to the specified path
//         ImageCapture.saveImage(image, filename);
        
//         // Print a message for each saved image
//         println("Saved image for Part ID " + part.getId() + " to " + filename);
//     }
// }
