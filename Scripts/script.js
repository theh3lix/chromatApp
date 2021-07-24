var app = new Vue({
    el: '#calc',
    data: {
        message: '0.00',
        resolution: '10x15',
        files: [],
        quantity: 1,
        amount: 0,
        amount9: 0,
        amount13: 0,
        amount15: 0,
        amount20: 0,
        totalAmount: '0.00',
        uploadMessage: '',
        proceedDisabled: true,
        cnt: 0,
        nowShowed: 1
    },
    computed: {
        sumUp9: function() {
            let ret = 0.00;
            if(this.amount9<10) {
                ret = this.amount9*0.74;
            } else if(this.amount9<100) {
                ret = this.amount9*0.59;
            } else if(this.amount9<200) {
                ret = this.amount9*0.50;
            } else if(this.amount9<300) {
                ret = this.amount9*0.47;
            } else if(this.amount9<500) {
                ret = this.amount9*0.44;
            } else if(this.amount9<1000) { 
                ret = this.amount9*0.41;
            } else if(this.amount9<2000) {
                ret = this.amount9*0.39;
            } else {
                ret = this.amount9*0.33;
            }
            ret = ret.toFixed(2);
            return ret; 
        },
        sumUp13: function() {
            let ret = 0.00;
            if(this.amount13<10) {
                ret = this.amount13*1.12;
            } else if(this.amount13<100) {
                ret = this.amount13*0.89;
            } else if(this.amount13<200) {
                ret = this.amount13*0.76;
            } else if(this.amount13<300) {
                ret = this.amount13*0.71;
            } else if(this.amount13<500) {
                ret = this.amount13*0.67;
            } else if(this.amount13<1000) {
                ret = this.amount13*0.62;
            } else if(this.amount13<2000) {
                ret = this.amount13*0.58;
            } else {
                ret = this.amount13*0.49;
            }
            ret = ret.toFixed(2);
            return ret;
        },
        sumUp15: function() {
            let ret = 0.00;
            if(this.amount15<10) {
                ret = this.amount15*1.49;
            } else if(this.amount15<100) {
                ret = this.amount15*1.19;
            } else if(this.amount15<200) {
                ret = this.amount15*1.01;
            } else if(this.amount15<300) {
                ret = this.amount15*0.95;
            } else if(this.amount15<500) {
                ret = this.amount15*0.89;
            } else if(this.amount15<1000) {
                ret = this.amount15*0.83;
            } else if(this.amount15<2000) {
                ret = this.amount15*0.78;
            } else {
                ret = this.amount15*0.66;
            }
            ret = ret.toFixed(2);
            return ret;
        },
        sumUp20: function() {
            let ret = 0.00;
            if(this.amount20<10) {
                ret = this.amount20*3.70;
            } else if(this.amount20<100) {
                ret = this.amount20*2.96;
            } else if(this.amount20<200) {
                ret = this.amount20*2.52;
            } else if(this.amount20<300) {
                ret = this.amount20*2.37;
            } else if(this.amount20<500) {
                ret = this.amount20*2.22;
            } else if(this.amount20<1000) {
                ret = this.amount20*2.07;
            } else if(this.amount20<2000) {
                ret = this.amount20*1.93;
            } else {
                ret = this.amount20*1.63;
            }
            ret = ret.toFixed(2);
            return ret;
        }
    },
    methods: {
        specificIncrement: function(resolutionId, amount, amountToIncrement, element) {
            let resolutionElement = document.getElementById(resolutionId);
            let resolution = $(resolutionElement).val();
            if(resolution == "default")
                resolution = this.resolution;

            if(resolution == "9x13" || resolution == "10x15") {
                this.amount9+= amountToIncrement;
                $(element).val(amount);
            }
            else if(resolution == "13x18") {
                this.amount13+= amountToIncrement;
                $(element).val(amount);
            }
            else if(resolution == "15x21") {
                this.amount15+= amountToIncrement;
                $(element).val(amount);
            }
            else if(resolution == "20x30") {
                this.amount20+= amountToIncrement;
                $(element).val(amount);
            }
        },
        changeAmount: function(event) {
            let amount = event.target.value;
            let main_element = document.getElementById(event.target.name);
            let name = event.target.name.replace("Ilosc", "oldAmount");
            let element = document.getElementById(name);
            let oldAmount = $(element).val();
            let amountToIncrement = amount - oldAmount;
            let resolutionId = event.target.name.replace("Ilosc", "Rozmiar");
            $(main_element).val(amount);
            this.specificIncrement(resolutionId, amount, amountToIncrement, element);
            this.calculate();
        },
        increment: function(event) {
            let resolution = event.target.value;
            let name = event.target.name.replace("Rozmiar", "oldres");
            let amountId = event.target.name.replace("Rozmiar", "Ilosc");
            let element = document.getElementById(name);
            let amountElement = document.getElementById(amountId);
            let amountToIncrement = $(amountElement).val();
            console.log("Quantity of changing photos: " + amountToIncrement);
            let oldRes = $(element).val();
            if(oldRes == "")
                oldRes = this.resolution;
            if(resolution == "default")
                resolution = this.resolution;

            if(resolution == "9x13" || resolution == "10x15") {
                this.amount9+= parseInt(amountToIncrement);
                this.decrement(oldRes, amountToIncrement);
                $(element).val(resolution);
            }
            else if(resolution == "13x18") {
                this.amount13+= parseInt(amountToIncrement);
                this.decrement(oldRes, amountToIncrement);
                $(element).val(resolution);
            }
            else if(resolution == "15x21") {
                this.amount15+= parseInt(amountToIncrement);
                this.decrement(oldRes, amountToIncrement);
                $(element).val(resolution);
            }
            else if(resolution == "20x30") {
                this.amount20+= parseInt(amountToIncrement);
                this.decrement(oldRes, amountToIncrement);
                $(element).val(resolution);
            }
            this.calculate();
        },
        decrement: function(res, amountToIncrement) {
            if(res == "9x13" || res == "10x15")
                this.amount9-=parseInt(amountToIncrement);
            else if(res == "13x18")
                this.amount13-=parseInt(amountToIncrement);
            else if(res == "15x21")
                this.amount15-=parseInt(amountToIncrement);
            else if(res == "20x30")
                this.amount20-=parseInt(amountToIncrement);
        },
        order1: function() {
            let modal = document.getElementById("PD");
            let fl = document.getElementById("Files").files;
            if(fl.length != 0) {
                  modal.style.display = "block";
                  document.getElementById(`img-${this.nowShowed}-preview`).style.display='block';
                  document.getElementById(`img-${this.nowShowed}-attr`).style.display='block';
            }
        },
        next: function() {
            document.getElementById('img-'+this.nowShowed+'-preview').style.display='none';
            document.getElementById('img-'+this.nowShowed+'-attr').style.display='none';
            this.nowShowed++;
            console.log(this.nowShowed);
            console.log(this.cnt);
            if(this.nowShowed>this.cnt) this.nowShowed=1;
            document.getElementById('img-'+this.nowShowed+'-preview').style.display='block';
            document.getElementById('img-'+this.nowShowed+'-attr').style.display='block';
        },
        prev: function() {
            document.getElementById('img-'+this.nowShowed+'-preview').style.display='none';
            document.getElementById('img-'+this.nowShowed+'-attr').style.display='none';
            this.nowShowed--;
            console.log(this.cnt);
            console.log(this.nowShowed);
            if(this.nowShowed==0) this.nowShowed=this.cnt;
            document.getElementById('img-'+this.nowShowed+'-preview').style.display='block';
            document.getElementById('img-'+this.nowShowed+'-attr').style.display='block';
        },
        updateUploadMessage: function(message){
            app.uploadMessage = message;
        },
        unlockButton: function() {
            app.proceedDisabled = false;
        },
        lockButton: function() {
            app.proceedDisabled = true;
        },
        imgToData: function(input) {
            let counter = 0;
            let upCount = 0;
            this.nowShowed = 1;
            let filesAmount = input.files.length;
            $.each(input.files, function(i, v) {
                var n = i + 1;
                counter++;
                var File = new FileReader();
                File.onload = function(event) {
                    upCount++;
                    $('<img/>').attr({
                        class: 'galleryImgs',
                        src: event.target.result,
                        id: n+'-img'
                    }).appendTo('#img-' + n + '-preview');
                    app.updateUploadMessage('Wczytano:' + upCount + '/' + filesAmount + ' plików!');
                    if(upCount==filesAmount){
                        app.unlockButton();
                    } else {
                        app.lockButton();
                    }
                };
                File.readAsDataURL(input.files[i]);
            });
            this.cnt = counter;
        },
        uploadFiles: function(event) {
            let quant = parseInt(this.quantity);
            console.log(quant);
            $('.galleryImgs').remove();
            $('.mySlides').css('display', 'none');
            $('.rozmiar').val('default');
            $('.powierzchnia').val('default');
            $('.wypelnienie').val('default');
            $('.sepia').val('default');
            $('.ilosc').val(quant.toString());
            $('.ramka').val('default');
            app.updateUploadMessage('');
            this.files = event.target.files;
            if(event.target.files != null) {
                this.amount = event.target.files.length * quant;
                this.imgToData(event.target);
            }
            this.calculateAll();
        },
        calculateAll: function() {
            this.amount9 = 0;
            this.amount13 = 0;
            this.amount15 = 0;
            this.amount20 = 0;
            if(this.resolution === "9x13" || this.resolution === "10x15") {
                this.amount9 = this.amount;
            } else if(this.resolution === "13x18") {
                this.amount13 = this.amount;
            } else if(this.resolution === "15x21") {
                this.amount15 = this.amount;
            } else if(this.resolution === "20x30") {
                this.amount20 = this.amount;
            }
            this.calculate();
        },
        calculate: function() {
            //let template = this.attributesTemplate;
            let returnValue = parseFloat(this.sumUp9) + parseFloat(this.sumUp13) + parseFloat(this.sumUp15) + parseFloat(this.sumUp20);
            this.message = returnValue.toFixed(2);
        },
        submitForm: function() {
            //this.followUploadProgress();
            if(!confirm("Jesteś pewien?"))
                return false;
            document.getElementById("spinner").style.display = "inline-block";
            var option_form = $("#orderForm");
            var inputs = $("#orderForm input");
            console.log(option_form.serialize());
            $.ajax({
                url: option_form.attr('action'),
                type: option_form.attr('method'),
                data: inputs.serialize(),
                dataType: 'json',
                        timeout: 10000, // 10 Minutes
                success: function (data) {
                    if (data) {
                        console.log(data);
                    }
                    document.getElementById("spinner").style.display = "none";
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    document.getElementById("spinner").style.display = "none";
                    if (xhr.status == 500) {
                        alert ( "Sorry submission failed error message:!!" + xhr.responseText);
                    } else {
                        alert ( "Error " + xhr.status);
                    }
                }
            });
        },
        followUploadProgress: function() {
            setInterval(function(){
                console.log("checking upload progress");
                $.post("/Home/GetProgress?email=michal@chromat.pl",
                    function(progress){
                        console.log("Progress: " + progress);
                        $("#progressMessage").html(progress+"%");
                    }
                );
            }, 500);
        }
    }
});
// Get the modal
var md = document.getElementById("PD");

// Get the button that opens the modal
//var btn = document.getElementById("order");

//let fl = document.getElementById("Files").files;
// Get the <span> element that closes the modal
//let span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
//span.onclick = function() {
//  md.style.display = "none";
//}
window.onclick = function(event) {
  if (event.target == md) {
    md.style.display = "none";
  }
} 
// When the user clicks on the button, open the modal
//btn.onclick = function() {
//  if(fl.length != 0) {
//    modal.style.display = "block";
//  }
    
//}

// When the user clicks anywhere outside of the modal, close it
