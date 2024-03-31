import { Lines, Terminal, TextLine, textLine, textWord, useEventQueue } from "crt-terminal";
import { useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import useSound from "use-sound";

import radio from "./assets/radio.wav";
import Layout from "./components/layout/layout";
import { PRINT_BOOT } from "./prints";
import classes from "./styles/app.module.css";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const BOOT_SEQUENCE = async (
  loading: { (payload: boolean): void; (arg0: boolean): void },
  clear: { (): void; (): void },
  print: { (payload: Lines[]): void; (arg0: TextLine[]): void }
) => {
  loading(true);
  for (let index = 0; index < PRINT_BOOT.length; index++) {
    const TEXT_LINE = PRINT_BOOT[index];
    print([
      textLine({ words: [textWord({ characters: TEXT_LINE.textLine })] }),
    ]);
    await sleep(TEXT_LINE.wait);
  }

  loading(false);
  clear();
};

const HANDLE_LOGIN = async (
  command: string,
  print: { (payload: Lines[]): void; (arg0: TextLine[]): void },
  clear: { (): void; (): void },
  lock: (payload: boolean) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  playSound: any
) => {
  const AVAILABLE_COMMANDS = {
    help: {
      func: function () {
        print([
          textLine({
            words: [
              textWord({
                characters: `Доступные команды:\n> help - Показывает справку\n> ls - Список файлов\n> play <file> - Воспроизводит файл\n> clear - Очищает консоль`,
              }),
            ],
          }),
        ]);
      },
    },
    ls: {
      func: function () {
        print([
          textLine({
            words: [
              textWord({
                characters: `latest-broadcast.m3u`,
              }),
            ],
          }),
        ]);
      },
    },
    play: {
      func: function () {
        lock(true);
        print([
          textLine({
            words: [
              textWord({
                characters: `Воспроизведение аудиозаписи`,
              }),
            ],
          }),
        ]);
        playSound();
        setTimeout(() => {
          lock(false);
          print([
            textLine({
              words: [
                textWord({
                  characters: `Запись звука окончена`,
                }),
              ],
            }),
          ]);
        }, 41000);
      },
    },
    clear: {
      func: function () {
        clear();
      },
    },
  };

  lock(true);

  const splitCommand = command.split(" ");
  if (splitCommand[0] === "play") {
    if (splitCommand.length !== 2) {
      print([
        textLine({
          words: [
            textWord({
              characters: `Недействительным аргумент`,
            }),
          ],
        }),
      ]);
      lock(false);
      return;
    }

    if (splitCommand[1] === "latest-broadcast.m3u") {
      AVAILABLE_COMMANDS.play.func();
      return;
    } else {
      print([
        textLine({
          words: [
            textWord({
              characters: `Неизвестный файл`,
            }),
          ],
        }),
      ]);
      lock(false);
      return;
    }
  }

  if (command in AVAILABLE_COMMANDS) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    AVAILABLE_COMMANDS[command].func();
    lock(false);
  } else {
    print([
      textLine({
        words: [
          textWord({
            characters: `Неизвестная команда`,
          }),
        ],
      }),
    ]);
  }
  lock(false);
};

const App = () => {
  const [playSound] = useSound(radio, { volume: 0.25 });
  const eventQueue = useEventQueue();
  const { loading, clear, print, lock } = eventQueue.handlers;

  useEffect(() => {
    (async () => {
      await BOOT_SEQUENCE(loading, clear, print);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <main className={classes.mainContainer}>
        <Terminal
          queue={eventQueue}
          onCommand={(command) =>
            HANDLE_LOGIN(command, print, clear, lock, playSound)
          }
        />
      </main>
    </Layout>
  );
};

export default App;
