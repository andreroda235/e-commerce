import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

import classes from "./ImageUpload.module.css";
import formClasses from "./Input.module.css";

const ImageUpload = ({ id, center,onInput }) => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);
    const filePicker = useRef();

    useEffect(() => {
        if(!file) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    },[file]);

    const pickedHandler = (event) => {
        const files = event.target.files;

        let pickedFile;
        let fileIsValid = isValid;
        if(files && files.length === 1) {
            pickedFile = files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        }else {
            setIsValid(false);
            fileIsValid = false;
        }
        onInput(id, pickedFile, fileIsValid);
    };

    const pickImageHander = () => {
        filePicker.current.click();
    };

    return (
        <div className={formClasses["form-control"]}>
            <input
                id={id}
                ref={filePicker}
                style={{ display: "none" }}
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <div className={classes['image-upload'] + ' ' + (center && 'center')}>
                <div className={classes.preview}>
                    {previewUrl && <img src={previewUrl} alt="preview"/>}
                    {!previewUrl && <p>Please pick an image.</p>}
                </div>
                <Button type="button" onClick={pickImageHander}>
                    PICK IMAGE
                </Button>
            </div>
        </div>
    );
};

export default ImageUpload;
