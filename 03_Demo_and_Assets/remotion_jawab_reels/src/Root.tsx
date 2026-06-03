import {Composition, Folder} from 'remotion';
import {JawabLaunchFilm} from './launch-film';
import {FastestClinicWins, FutureStandard, SilentLeakA} from './reels';

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const RemotionRoot = () => {
  return (
    <Folder name="Jawab-Instagram-Reels">
      <Composition
        id="JawabLaunchFilm"
        component={JawabLaunchFilm}
        width={WIDTH}
        height={HEIGHT}
        fps={FPS}
        durationInFrames={60 * FPS}
      />
      <Composition
        id="SilentLeakA"
        component={SilentLeakA}
        width={WIDTH}
        height={HEIGHT}
        fps={FPS}
        durationInFrames={24 * FPS}
      />
      <Composition
        id="FastestClinicWins"
        component={FastestClinicWins}
        width={WIDTH}
        height={HEIGHT}
        fps={FPS}
        durationInFrames={18 * FPS}
      />
      <Composition
        id="FutureStandard"
        component={FutureStandard}
        width={WIDTH}
        height={HEIGHT}
        fps={FPS}
        durationInFrames={28 * FPS}
      />
    </Folder>
  );
};
