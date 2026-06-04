import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Camera, X, Loader, Check } from 'lucide-react';
import { hexToRgb, findNearestColorName } from '../lib/colorUtils';
import { useApp } from '../context/AppContext';
import type { ColorInfo, Palette } from '../types';

const SAMPLE_EXTRACTIONS: ColorInfo[][] = [
  [
    { hex: '#2D4A27', rgb: { r: 45, g: 74, b: 39 }, name: 'Olive Green' },
    { hex: '#C9A84C', rgb: { r: 201, g: 168, b: 76 }, name: 'Gold' },
    { hex: '#8B6914', rgb: { r: 139, g: 105, b: 20 }, name: 'Dark Gold' },
    { hex: '#DDD0B3', rgb: { r: 221, g: 208, b: 179 }, name: 'Sand' },
    { hex: '#1A1A0A', rgb: { r: 26, g: 26, b: 10 }, name: 'Dark Olive' },
  ],
  [
    { hex: '#8B1A1A', rgb: { r: 139, g: 26, b: 26 }, name: 'Deep Red' },
    { hex: '#C9502B', rgb: { r: 201, g: 80, b: 43 }, name: 'Brick Orange' },
    { hex: '#F5C89A', rgb: { r: 245, g: 200, b: 154 }, name: 'Peach' },
    { hex: '#2D2D2D', rgb: { r: 45, g: 45, b: 45 }, name: 'Charcoal' },
    { hex: '#F5E6D3', rgb: { r: 245, g: 230, b: 211 }, name: 'Cream' },
  ],
  [
    { hex: '#4B1D4D', rgb: { r: 75, g: 29, b: 77 }, name: 'Deep Plum' },
    { hex: '#D4AF37', rgb: { r: 212, g: 175, b: 55 }, name: 'Antique Gold' },
    { hex: '#F2C9A7', rgb: { r: 242, g: 201, b: 167 }, name: 'Peach Blush' },
    { hex: '#E8E3D6', rgb: { r: 232, g: 227, b: 214 }, name: 'Champagne' },
    { hex: '#1F4621', rgb: { r: 31, g: 70, b: 33 }, name: 'Forest Green' },
  ],
];

export default function FabricUploadPage() {
  const navigate = useNavigate();
  const { savePalette } = useApp();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [extractedColors, setExtractedColors] = useState<ColorInfo[] | null>(null);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setExtractedColors(null);
      setSaved(false);
      setTimeout(() => simulateExtraction(), 500);
    };
    reader.readAsDataURL(file);
  };

  const simulateExtraction = () => {
    setExtracting(true);
    setTimeout(() => {
      const idx = Math.floor(Math.random() * SAMPLE_EXTRACTIONS.length);
      setExtractedColors(SAMPLE_EXTRACTIONS[idx]);
      setExtracting(false);
    }, 2500);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFile(file);
  };

  const handleSave = () => {
    if (!extractedColors) return;
    const palette: Palette = {
      id: `fabric-${Date.now()}`,
      name: 'Fabric Extract',
      description: 'Colors extracted from uploaded fabric',
      colors: extractedColors,
      category: 'casual',
      likes: 0,
      tags: ['Fabric', 'Extracted'],
    };
    savePalette(palette);
    setSaved(true);
  };

  return (
    <div className="min-h-screen bg-cream-50 pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-cream-200">
        <div className="max-w-[480px] mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full hover:bg-cream-100 flex items-center justify-center">
            <ArrowLeft size={18} className="text-gray-700" />
          </button>
          <h1 className="font-serif font-semibold text-burgundy-950 text-lg">Upload Fabric</h1>
        </div>
      </div>

      <div className="max-w-[480px] mx-auto px-4 py-5 space-y-5">
        <div className="text-center">
          <p className="text-gray-500 text-sm">Upload a fabric picture and we'll find the perfect color matches</p>
        </div>

        {/* Upload area */}
        <div
          className={`border-2 border-dashed rounded-3xl overflow-hidden transition-all cursor-pointer ${
            uploadedImage ? 'border-transparent' : 'border-cream-300 hover:border-gold-400 bg-white'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => !uploadedImage && fileRef.current?.click()}
        >
          {uploadedImage ? (
            <div className="relative">
              <img src={uploadedImage} alt="Uploaded fabric" className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/60 to-transparent" />
              {extracting && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-burgundy-950/50">
                  <Loader size={32} className="text-gold-400 animate-spin" />
                  <p className="text-white font-medium text-sm">Extracting colors...</p>
                </div>
              )}
              <button
                className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setUploadedImage(null);
                  setExtractedColors(null);
                  setSaved(false);
                }}
              >
                <X size={14} className="text-gray-700" />
              </button>
              {!extracting && (
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                  <div className="flex gap-1.5 flex-wrap">
                    {extractedColors?.slice(0, 5).map((c, i) => (
                      <div key={i} className="w-7 h-7 rounded-full border-2 border-white shadow" style={{ backgroundColor: c.hex }} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center">
                <Upload size={24} className="text-burgundy-900" />
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-700 text-sm">Drag & drop or tap to upload</p>
                <p className="text-gray-400 text-xs mt-1">Supports JPEG, PNG, WEBP</p>
              </div>
            </div>
          )}
        </div>

        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />

        {/* Camera button */}
        <button
          onClick={() => fileRef.current?.click()}
          className="w-full py-3 rounded-2xl border-2 border-cream-200 flex items-center justify-center gap-2 text-gray-600 text-sm font-medium hover:border-burgundy-900 hover:text-burgundy-900 transition-colors bg-white"
        >
          <Camera size={18} />
          Take a Photo
        </button>

        {/* Sample fabrics */}
        {!uploadedImage && (
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">Try with a sample fabric</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=400',
                'https://images.pexels.com/photos/3943878/pexels-photo-3943878.jpeg?auto=compress&cs=tinysrgb&w=400',
                'https://images.pexels.com/photos/1488315/pexels-photo-1488315.jpeg?auto=compress&cs=tinysrgb&w=400',
              ].map((img, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setUploadedImage(img);
                    setTimeout(() => simulateExtraction(), 300);
                  }}
                  className="rounded-xl overflow-hidden aspect-square hover:opacity-90 transition-opacity"
                >
                  <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Extracted colors */}
        {extractedColors && !extracting && (
          <div className="card p-4 animate-fade-in">
            <p className="text-sm font-semibold text-gray-700 mb-3">Matching Colors</p>
            <div className="flex gap-2 mb-4">
              {extractedColors.map((color, i) => (
                <div key={i} className="flex-1 h-12 rounded-xl color-swatch" style={{ backgroundColor: color.hex }} title={`${color.name} ${color.hex}`} />
              ))}
            </div>
            <div className="space-y-2">
              {extractedColors.map((color, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex-shrink-0" style={{ backgroundColor: color.hex }} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{color.name}</p>
                    <p className="text-xs text-gray-400 font-mono">{color.hex.toUpperCase()}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSave}
              className={`w-full mt-4 py-3 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                saved ? 'bg-green-500 text-white' : 'btn-primary'
              }`}
            >
              {saved ? <><Check size={16} /> Saved!</> : 'Save Color Palette'}
            </button>
            <button
              onClick={() => navigate('/app/color-picker')}
              className="w-full mt-2 py-3 rounded-2xl font-semibold text-sm btn-outline"
            >
              View Full Palettes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
