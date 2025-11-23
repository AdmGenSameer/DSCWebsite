import { useCallback, useEffect, useState } from 'react';
import styles from './Video.module.css';

function Video() {
  const [video, setVideo] = useState('design');
  const [documentWidth, setDocumentWidth] = useState(0);

  useEffect(() => {
    setDocumentWidth(document.documentElement.clientWidth);
  }, []);

  const VideoPlay = useCallback((src) => {
    setVideo(src);
    document.getElementById('videoContainer').style.opacity = 1;
    document.getElementById('video').play();
  }, []);

  const VideoPause = useCallback(() => {
    document.getElementById('videoContainer').style.opacity = 0;
    document.getElementById('video').pause();
    setVideo('');
  }, []);

  const Heading = useCallback(
    ({ src, text }) => {
      return (
        <h1
          onMouseEnter={() => {
            VideoPlay(src);
          }}
          onMouseLeave={VideoPause}
          onTouchStart={() => {
            VideoPlay(src);
          }}
        >
          {text}
        </h1>
      );
    },
    [VideoPause, VideoPlay]
  );

  return (
    <section className={styles.video} style={{ position: 'relative' }}>
      {/* Halloween Pumpkin Decorations */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 5,
        }}
      >
        {/* Large Pumpkin beside Code text - Right side */}
        <div
          style={{
            position: 'absolute',
            right: '-100px',
            bottom: '15%',
            width: '200px',
          }}
          className="sm:hidden"
        >
          <div
            className="animate-pulse"
            style={{ animationDuration: '3s', animationDelay: '0.5s' }}
          >
            <span
              style={{
                fontSize: '160px',
                display: 'block',
                filter: 'drop-shadow(0 0 30px rgba(255,140,0,0.6))',
                opacity: 0.7,
              }}
            >
              🎃
            </span>
          </div>
        </div>

        {/* Medium Pumpkin beside Design text - Left side */}
        <div
          style={{
            position: 'absolute',
            left: '-80px',
            top: '20%',
            width: '150px',
          }}
          className="sm:hidden"
        >
          <div
            className="animate-pulse"
            style={{ animationDuration: '4s', animationDelay: '1s' }}
          >
            <span
              style={{
                fontSize: '120px',
                display: 'block',
                filter: 'drop-shadow(0 0 25px rgba(255,165,0,0.5))',
                opacity: 0.6,
              }}
            >
              🎃
            </span>
          </div>
        </div>
      </div>

      {documentWidth >= 600 && (
        <div id="videoContainer" className={styles.designVideoContainer}>
          <video
            src="/video/design.mp4"
            autoPlay
            muted
            loop
            controls={false}
            id="video"
            className={
              video === 'design' ? 'w-screen opacity-100' : 'w-0 opacity-0'
            }
          >
            <track kind="captions" />
          </video>
          <video
            src="/video/develop.mp4"
            autoPlay
            muted
            loop
            controls={false}
            id="video"
            className={
              video === 'develop' ? 'w-screen opacity-100' : 'w-0 opacity-0'
            }
          >
            <track kind="captions" />
          </video>
          <video
            src="/video/code.mp4"
            autoPlay
            muted
            loop
            controls={false}
            id="video"
            className={
              video === 'code' ? 'w-screen opacity-100' : 'w-0 opacity-0'
            }
          >
            <track kind="captions" />
          </video>
        </div>
      )}

      <div className={styles.content}>
        {documentWidth >= 600 ? (
          <>
            <Heading src="design" text="Design." />
            <Heading src="develop" text="Develop." />
            <Heading src="code" text="Code." />
          </>
        ) : (
          <>
            <h1>Design.</h1>
            <h1>Develop.</h1>
            <h1>Code.</h1>
          </>
        )}
      </div>
    </section>
  );
}

export default Video;
