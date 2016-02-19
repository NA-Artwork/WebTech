use "strict"
var Slider = function(options){
    var bar,
        slider,
        toggle,
        percent,
        that = this;

    function _init(options){
        _construct();

        if(options.container && options.container.appendChild){
            options.container.appendChild(bar);
        }
        else{
            document.getElementById(options.container).appendChild(bar);
        }

        if(options.value){
            that.value(options.value);
        }
    };

    function _construct(){
        bar = document.createElement('div');
        bar.className = 'slider-bar';
        slider = document.createElement('div');
        slider.className = 'slider-slider';
        bar.appendChild(slider);
        toggle = document.createElement('div');
        toggle.className = 'slider-toggle';
        slider.appendChild(toggle);

        bar.addEventListener('mousedown', _startSlide, false);
    };

    function _startSlide(e){
        var x = e.offsetX==undefined?e.layerX:e.offsetX;

        percent = (x / bar.offsetWidth).toFixed(2);
        slider.style.width = (percent * 100) + '%';

        document.addEventListener('mousemove', _moveSlide, false);
        document.addEventListener('mouseup', _stopSlide, false);

        _onChange();
    };

    function _moveSlide(e){
        if(e.target == bar){
            var x = e.offsetX==undefined?e.layerX:e.offsetX;

            percent = (x / bar.offsetWidth).toFixed(2);
            slider.style.width = (percent * 100) + '%';
            _onChange();
        }
    };

    function _stopSlide(e){
        document.removeEventListener('mousemove', _moveSlide, false);
        document.removeEventListener('mousemove', _stopSlide, false);
    };

    function _onChange(){
        if(typeof options.onChange == 'function'){
            options.onChange(percent);
        }
    };

    this.value = function(value){
        if(value == null){
            return percent;
        }
        else{
            percent = (value > 1 ? 1 : (value < 0 ? 0 : value));
            slider.style.width = (percent * 100) + '%';
            _onChange();
        }
    };

    _init(options);
};

/* CSS example
 @dzenkovich
Owner
dzenkovich commented on Jun 19, 2013
This is an improvement to this simple bar code https://gist.github.com/kosso/1118840

Sample usage:

   bar = new Slider({
        container: container,
        value: 0.7,
        onChange: function(value){
            console.log(value);
        }
    });

*/

/* CSS example

.slider-bar {
position:relative;
width:100px;
height:10px;
border:1px solid #444;
border-radius: 5px;
cursor:pointer;

}

.slider-bar .slider-slider {
position:absolute;
width:0%;
height:100%;
border-radius: 5px;
background-color: #bbb;
top:0px;
left:0px;
}

.slider-bar .slider-slider .slider-toggle {
position:absolute;
width: 4px;
height: 150%;
top: -40%;
right: -3px;
border:1px solid #444;
background-color: #eee;
} */
