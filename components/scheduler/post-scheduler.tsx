'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { useDropzone } from 'react-dropzone';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Upload, X, Hash, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PostScheduler() {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('12:00');
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [newHashtag, setNewHashtag] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'video/*': ['.mp4', '.mov'],
    },
    maxSize: 100 * 1024 * 1024, // 100MB
    onDrop: (acceptedFiles) => {
      setFiles(prev => [...prev, ...acceptedFiles]);
    },
  });

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const addHashtag = () => {
    if (newHashtag && !hashtags.includes(newHashtag)) {
      setHashtags([...hashtags, newHashtag]);
      setNewHashtag('');
    }
  };

  const removeHashtag = (hashtag: string) => {
    setHashtags(hashtags.filter(h => h !== hashtag));
  };

  const suggestedHashtags = [
    'photography', 'lifestyle', 'travel', 'fashion', 'food',
    'fitness', 'motivation', 'business', 'art', 'nature'
  ];

  const handleSchedule = () => {
    if (!date || !caption || files.length === 0) {
      return;
    }

    const scheduleData = {
      files,
      caption,
      hashtags,
      scheduledFor: new Date(`${format(date, 'yyyy-MM-dd')}T${time}`),
    };

    console.log('Scheduling post:', scheduleData);
    // Here you would send the data to your API
  };

  return (
    <Card className="glass-card p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Create New Post</h3>
          <p className="text-muted-foreground">
            Upload media, write your caption, and schedule your post
          </p>
        </div>

        {/* Media Upload */}
        <div>
          <Label>Media Upload</Label>
          <div
            {...getRootProps()}
            className={cn(
              "mt-2 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragActive ? "border-primary bg-primary/5" : "border-white/20 hover:border-white/30"
            )}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">
              {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
            </p>
            <p className="text-muted-foreground">
              or click to select files (Images: JPG, PNG • Videos: MP4, MOV • Max: 100MB)
            </p>
          </div>

          {files.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              {files.map((file, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                    {file.type.startsWith('image/') ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{file.name}</p>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 p-0 bg-destructive hover:bg-destructive/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Caption */}
        <div>
          <Label htmlFor="caption">Caption</Label>
          <Textarea
            id="caption"
            placeholder="Write your caption here..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="mt-2 min-h-[120px] resize-none"
          />
          <p className="text-sm text-muted-foreground mt-1">
            {caption.length}/2200 characters
          </p>
        </div>

        {/* Hashtags */}
        <div>
          <Label>Hashtags</Label>
          <div className="mt-2 space-y-3">
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Add hashtag"
                  value={newHashtag}
                  onChange={(e) => setNewHashtag(e.target.value.replace('#', ''))}
                  onKeyPress={(e) => e.key === 'Enter' && addHashtag()}
                  className="pl-10"
                />
              </div>
              <Button onClick={addHashtag} disabled={!newHashtag}>
                Add
              </Button>
            </div>

            {hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {hashtags.map((hashtag) => (
                  <Badge key={hashtag} variant="secondary" className="text-sm">
                    #{hashtag}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeHashtag(hashtag)}
                      className="ml-1 w-4 h-4 p-0 hover:bg-transparent"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}

            <div>
              <p className="text-sm text-muted-foreground mb-2">Suggested hashtags:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedHashtags.filter(tag => !hashtags.includes(tag)).map((hashtag) => (
                  <Badge
                    key={hashtag}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/20"
                    onClick={() => setHashtags([...hashtags, hashtag])}
                  >
                    #{hashtag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Schedule Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal mt-2",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="time">Schedule Time</Label>
            <div className="relative mt-2">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3 pt-4">
          <Button
            onClick={handleSchedule}
            disabled={!date || !caption || files.length === 0}
            className="instagram-gradient text-white hover:opacity-90"
          >
            Schedule Post
          </Button>
          <Button variant="outline">
            Save as Draft
          </Button>
        </div>
      </div>
    </Card>
  );
}