import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    Slider,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './utils/cropimage';
import "./cropimage.css"


const CropEasy = ({ imageToCrop, setImageToCrop, setPreview, setFile, aspectRatio }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const cropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const cropImage = async () => {
        try {
            const { file, url } = await getCroppedImg(
                imageToCrop,
                croppedAreaPixels,
                rotation
            );
            setPreview(url);
            setFile(file);
            setImageToCrop(null); // Fecha o modal de recorte
        } catch (error) {
            console.error("Erro ao recortar a imagem: ", error);
        }
    };

    const iOSBoxShadow = '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

    const iosSliderStyles = (theme) => ({
        color: '#007bff',
        height: 5,
        padding: '15px 0',
        '& .MuiSlider-thumb': {
            height: 20,
            width: 20,
            backgroundColor: '#fff',
            boxShadow: '0 0 px 0px rgba(0, 0, 0, 0.1)', 
            '&:focus, &:hover, &.Mui-active': {
                boxShadow: `0px 0px 3px 1px rgba(0, 0, 0, 0.1), ${iOSBoxShadow}`, // Sombra iOS
            },
            '@media (hover: none)': {
                boxShadow: iOSBoxShadow, // Sombra iOS para dispositivos sem hover
            },
            '&:before': {
                boxShadow:
                    '0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)',
            },
        },
        '& .MuiSlider-track': {
            border: 'none',
            height: 5,
        },
        '& .MuiSlider-rail': {
            opacity: 0.5,
            boxShadow: 'inset 0px 0px 4px -2px #000',
            backgroundColor: '#d0d0d0',
        },
        '& .MuiSlider-valueLabel': {
            display: 'none', // Isso remove o número pop-up
        },
    });

    return (
        <>
            <DialogContent
                dividers
                sx={{
                    position: 'relative',
                    height: 400,
                    width: '100%',

                }}
            >
                <Cropper
                    image={imageToCrop}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={aspectRatio} // Usa o aspecto recebido como prop
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    onCropChange={setCrop}
                    onCropComplete={cropComplete}
                />
            </DialogContent>
            <DialogActions sx={{ flexDirection: 'column', mx: 3, my: 2 }}>
                <Box sx={{ width: '100%', mb: 1 }}>
                    <Box>
                        <h1 className='text-base font-normal leading-6'>Zoom: {zoomPercent(zoom)}</h1>
                        <Slider
                            valueLabelDisplay="auto"
                            valueLabelFormat={zoomPercent}
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e, zoom) => setZoom(zoom)}
                            sx={(theme) => iosSliderStyles(theme)}
                        />
                    </Box>
                    <Box>
                        <h1 className='text-base font-normal leading-6'>Ângulo: {rotation + '°'}</h1>
                        <Slider
                            valueLabelDisplay="auto"
                            min={0}
                            max={360}
                            value={rotation}
                            onChange={(e, rotation) => setRotation(rotation)}
                            sx={(theme) => iosSliderStyles(theme)}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        flexWrap: 'wrap',
                    }}
                >
            
                    <button onClick={cropImage} className='w-32 h-12 bg-blue-500 hover:bg-blue-700 
                    transition-all text-white py-2 px-4 rounded-full'
                    >Confirmar</button>

                    <button onClick={() => setImageToCrop(null)} className="w-32 h-12 bg-red-500 hover:bg-red-700 
                    transition-all text-white py-2 px-4 rounded-full"
                    > Cancelar</button>
                </Box>
            </DialogActions>
        </>
    );
};

export default CropEasy;

const zoomPercent = (value) => {
    return `${Math.round(value * 100)}%`;
};
