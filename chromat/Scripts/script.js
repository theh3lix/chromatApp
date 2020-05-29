var app = new Vue({
    el: '#calc',
    data: {
        message: '0.00',
        resolution: '',
        files: [],
        amount: 0,
        amount9: 0,
        amount13: 0,
        amount15: 0,
        amount20: 0,
        totalAmount: '0.00',
        cnt: 0,
        nowShowed: 1,
        attributesTemplate: `<div class='attrs' id='img-<n>-attr' style='display: none'>
            <select name='<n>-Rozmiar' class='btn-outline-light calculator-res att rozmiar'>
                <option selected='true' value='default'>Domyślne</option>
                <option value="10x15">10x15</option>
                <option value="13x18">13x18</option>
                <option value="15x21">15x21</option>
                <option value="20x30">20x30</option>
            </select><br/>
            <select name='<n>-Wypelnienie' class='btn-outline-light calculator-res att wypelnienie'>
                <option selected='true' value='default'>Domyślne</option>
                <option value="ndop">Przytnij</option>    
                <option value="dop">Dopasuj</option>   
            </select><br/>
            <select name='<n>-Powierzchnia' class='btn-outline-light calculator-res att powierzchnia'>
                <option selected='true' value='default'>Domyślne</option>
                <option value="mat">Mat</option>    
                <option value="błysk">Błysk</option>
            </select><br/>
            <select name='<n>-Sepia' class='btn-outline-light calculator-res att sepia'>
                <option selected='true' value='default'>Domyślne</option>
                <option value="">Kolor</option>   
                <option value="Czarno-białe">Czarno-białe</option>    
                <option value="sepia">Sepia</option>
            </select><br/>
            <input type="checkbox" class="btn-outline-light ramka" style="margin-bottom: 10px;" name="<n>-Ramka"><span> Biała ramka</span>
        </div>`
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
            if(this.amount<10) {
                ret = this.amount*3.70;
            } else if(this.amount<100) {
                ret = this.amount*2.96;
            } else if(this.amount<200) {
                ret = this.amount*2.52;
            } else if(this.amount<300) {
                ret = this.amount*2.37;
            } else if(this.amount<500) {
                ret = this.amount*2.22;
            } else if(this.amount<1000) {
                ret = this.amount*2.07;
            } else if(this.amount<2000) {
                ret = this.amount*1.93;
            } else {
                ret = this.amount*1.63;
            }
            ret = ret.toFixed(2);
            return ret;
        }
    },
    methods: {
        incrementDecrement: function(target) {
            console.log(target);
        },
        calc: function() {
            this.totalAmount = this.sumUp9() + this.sumUp13() + this.sumUp15() + this.sumUp20();
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
        imgToData: function(input, template) {
            console.log("weszlo tu");
            let counter = 0;
            this.nowShowed = 1;
            $('.mySlides').remove();
            $('.attrs').remove();
            
            $.each(input.files, function(i, v) {
                var n = i + 1;
                let attributesTemplateStr = template.split('<n>').join(n);
                counter++;
                var File = new FileReader();
                File.onload = function(event) {
                    $('<div/>').attr({
                        class: 'mySlides',
                        id: 'img-' + n + '-preview',
                    }).prependTo('#gallery');
                    $('#img-' + n + '-preview').html(attributesTemplateStr);
                    $('<img/>').attr({
                        class: 'galleryImgs',
                        src: event.target.result,
                        id: n+'-img'
                    }).appendTo('#img-' + n + '-preview');
                };
                File.readAsDataURL(input.files[i]);
            });
            this.cnt = counter;
        },
        Calculate: function(event) {
            let template = this.attributesTemplate;        
            if(event.target.files != null) {
                this.amount = event.target.files.length;
                this.imgToData(event.target, template);
            }
            if(this.resolution === "9x13" || this.resolution === "10x15") {
                if(this.amount<10) {
                    this.message = this.amount*0.74;
                    this.message = this.message.toFixed(2);
                    return;
                } else if(this.amount<100) {
                    this.message = this.amount*0.59;
                    this.message = this.message.toFixed(2);
                    return;
                } else if(this.amount<200) {
                    this.message = this.amount*0.50;
                    this.message = this.message.toFixed(2);
                    return;
                } else if(this.amount<300) {
                    this.message = this.amount*0.47;
                    this.message = this.message.toFixed(2);
                    return;
                } else if(this.amount<500) {
                    this.message = this.amount*0.44;
                    this.message = this.message.toFixed(2);
                    return;
                } else if(this.amount<1000) { 
                    this.message = this.amount*0.41;
                    this.message = this.message.toFixed(2);
                    return;
                } else if(this.amount<2000) {
                    this.message = this.amount*0.39;
                    this.message = this.message.toFixed(2);
                    return;
                } else {
                    this.message = this.amount*0.33;
                    this.message = this.message.toFixed(2);
                    return;
                }
            } else if(this.resolution === "13x18") {
                if(this.amount<10) {
                    this.message = this.amount*1.12;
                    this.message = this.message.toFixed(2);
                    return;
                } else if(this.amount<100) {
                    this.message = this.amount*0.89;
                    this.message = this.message.toFixed(2);
                    return;
                } else if(this.amount<200) {
                    this.message = this.amount*0.76;
                    this.message = this.message.toFixed(2);
                    return;
                } else if(this.amount<300) {
                    this.message = this.amount*0.71;
                    this.message = this.message.toFixed(2);
                    return;
                } else if(this.amount<500) {
                    this.message = this.amount*0.67;
                    this.message = this.message.toFixed(2);
                    return;
                } else if(this.amount<1000) {
                    this.message = this.amount*0.62;
                    this.message = this.message.toFixed(2);
                    return;
                } else if(this.amount<2000) {
                    this.message = this.amount*0.58;
                    this.message = this.message.toFixed(2);
                    return;
                } else {
                    this.message = this.amount*0.49;
                    this.message = this.message.toFixed(2);
                    return;
                }
            } else if(this.resolution === "15x21") {
                if(this.amount<10) {
                    this.message = this.amount*1.49;
                    this.message = this.message.toFixed(2);
                    return;
                } else if(this.amount<100) {
                    this.message = this.amount*1.19;
                    this.message = this.message.toFixed(2);
                    return;
                } else if(this.amount<200) {
                    this.message = this.amount*1.01;
                    this.message = this.message.toFixed(2);
                    return;
                } else if(this.amount<300) {
                    this.message = this.amount*0.95;
                    this.message = this.message.toFixed(2);
                    return;
                } else if(this.amount<500) {
                    this.message = this.amount*0.89;
                    this.message = this.message.toFixed(2);
                    return;
                } else if(this.amount<1000) {
                    this.message = this.amount*0.83;
                    this.message = this.message.toFixed(2);
                    return;
                } else if(this.amount<2000) {
                    this.message = this.amount*0.78;
                    this.message = this.message.toFixed(2);
                    return;
                } else {
                    this.message = this.amount*0.66;
                    this.message = this.message.toFixed(2);
                    return;
                }
            } else if(this.resolution === "20x30") {
                if(this.amount<10) {
                    this.message = this.amount*3.70;
                    this.message = this.message.toFixed(2);
                    return;
                } else if(this.amount<100) {
                    this.message = this.amount*2.96;
                    this.message = this.message.toFixed(2);
                    return;
                } else if(this.amount<200) {
                    this.message = this.amount*2.52;
                    this.message = this.message.toFixed(2);
                    return;
                } else if(this.amount<300) {
                    this.message = this.amount*2.37;
                    this.message = this.message.toFixed(2);
                    return;
                } else if(this.amount<500) {
                    this.message = this.amount*2.22;
                    this.message = this.message.toFixed(2);
                    return;
                } else if(this.amount<1000) {
                    this.message = this.amount*2.07;
                    this.message = this.message.toFixed(2);
                    return;
                } else if(this.amount<2000) {
                    this.message = this.amount*1.93;
                    this.message = this.message.toFixed(2);
                    return;
                } else {
                    this.message = this.amount*1.63;
                    this.message = this.message.toFixed(2);
                    return;
                }
            }
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
