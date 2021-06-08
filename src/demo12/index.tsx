import React from 'react';
import ReactDOM from 'react-dom';

const PIC_URL_2 = './test-images/2.JPG';







class App extends React.Component{

    observer = null;
    containerRef = null;

    originImage = null;

    state = {
        width: 700,
        height: 100,
        originImageWidth: 700,
        originImageHeight: 700,
    }


    componentDidMount() {
        this.observer = new (window as any).ResizeObserver((entries) => {
            entries.forEach((entry) => {
                
                this.setState({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                })
                
            });
        });
        this.observer.observe(this.containerRef);
        this.originImage = new Image();
        this.originImage.src = PIC_URL_2;
        this.originImage.onload = this.imageLoaded;
        (window as any).i = this.originImage;
    }

    componentWillUnmount() {
        this.observer.disconnect();
    }

    imageLoaded = () => {
        this.setState({
            originImageWidth: this.originImage.width,
            originImageHeight: this.originImage.width,
        })
    }



    render() {

        const { width, height, originImageWidth, originImageHeight } = this.state;

        const style = {
            backgroundImage: `url(${PIC_URL_2})`,
            left: -1000,
            top: -3000,
            width: originImageWidth,
            height: originImageHeight,
        }

        return (
            <div className="cropper" >
                
                <div className="banner-editor-wrapper" ref={(_) => this.containerRef = _}>
                    <div className="banner-editor-editbar-wrapper"></div>
                    <div className="image-resize" style={{ width, height}}>
                        <div className="image-resize-phantom" style={style}></div>
                        <div className="image-resize-image-container">
                            <div className="image-resize-image" style={style}/>
                            <div className="image-resize-image-box"/>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}







const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(<App />, root);





