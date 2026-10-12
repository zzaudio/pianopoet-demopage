// Change excerptStart and excerptEnd to select the default listening window for each piece.
const TRACKS = [
  { file: "01_Bach", composer: "J. S. Bach", excerptStart: 0, excerptEnd: 10, duration: 30 },
  { file: "02_Haydn", composer: "J. Haydn", excerptStart: 20, excerptEnd: 30, duration: 30 },
  { file: "03_Beethoven", composer: "Beethoven", excerptStart: 22, excerptEnd: 30, duration: 30 },
  { file: "04_Schubert", composer: "F. Schubert", excerptStart: 10, excerptEnd: 20, duration: 30 },
  { file: "05_Brahms", composer: "J. Brahms", excerptStart: 13, excerptEnd: 23, duration: 30 },
  { file: "06_Liszt", composer: "F. Liszt", excerptStart: 18, excerptEnd: 28, duration: 30 },
  { file: "07_Chopin", composer: "F. Chopin", excerptStart: 15, excerptEnd: 29, duration: 30 },
  { file: "08_Debussy", composer: "C. Debussy", excerptStart: 24, excerptEnd: 30, duration: 30 },
  { file: "09_Rachmaninoff", composer: "S. Rachmaninoff", excerptStart: 12.5, excerptEnd: 22.5, duration: 30 },
  { file: "10_Mendelssohn", composer: "F. Mendelssohn", excerptStart: 19, excerptEnd: 29, duration: 30 },
];

const RESTORATION_TRACKS = [
  { file: "4_OUsU-TtS4", youtubeId: "4_OUsU-TtS4", title: "Rachmaninov", shortLabel: "Rachmaninov", duration: 30, excerptStart: 0, excerptEnd: 30 },
  { file: "nHqfnoWUmLs", youtubeId: "nHqfnoWUmLs", title: "Chopin", shortLabel: "Chopin", duration: 30, excerptStart: 0, excerptEnd: 30 },
  { file: "u-VgyjLS3ok", youtubeId: "u-VgyjLS3ok", title: "Chopin", shortLabel: "Chopin", duration: 30, excerptStart: 0, excerptEnd: 30 },
  { file: "VK2uTtuI84w", youtubeId: "VK2uTtuI84w", title: "Scriabin", shortLabel: "Scriabin", duration: 30, excerptStart: 0, excerptEnd: 30 },
];

const STEREO_CONTROL_TRACKS = [
  { file: "u-VgyjLS3ok", title: "Chopin", shortLabel: "Chopin", duration: 30, excerptStart: 0, excerptEnd: 30 },
];

const DEMOS = [
  {
    rootId: "rendering-demo",
    basePath: "mp3-30s/rendering",
    methods: [
      { name: "PianoPoet", folder: "unified-7-2-2-temp1.05", extension: "mp3", tag: "Ours" },
      { name: "Ground truth", folder: "GT", extension: "mp3", tag: "Reference" },
      { name: "U-MuST", folder: "UMusT", extension: "mp3" },
      { name: "M2A", folder: "M2A", extension: "mp3" },
      { name: "MIDI-VALLE", folder: "MIDIVALLE", extension: "mp3" },
      { name: "P-MUSE", folder: "PMUSE", extension: "mp3" },
      { name: "FluidSynth", folder: "FluidSynth", extension: "mp3" },
    ],
  },
  {
    rootId: "codec-demo",
    basePath: "mp3-30s/codec",
    methods: [
      {
        name: "PianoPoet DAC + semantic distillation",
        folder: "PianoPoetDAC-SemanticDistill",
        extension: "mp3",
        tag: "Ours",
      },
      {
        name: "PianoPoet DAC without distillation",
        folder: "PianoPoetDAC-NoDistill",
        extension: "mp3",
        tag: "Ablation",
      },
      {
        name: "Ground truth",
        basePath: "mp3-30s/rendering",
        folder: "GT",
        extension: "mp3",
        tag: "Reference",
      },
      { name: "DAC", folder: "DAC", extension: "mp3" },
      { name: "EnCodec", folder: "EnCodec", extension: "mp3" },
      { name: "MIDI-VALLE EnCodec", folder: "MIDIVALLE-EnCodec", extension: "mp3" },
      { name: "SpectroStream", folder: "SpectroStream", extension: "mp3" },
      { name: "U-MuST DAC", folder: "umust-dac", extension: "mp3" },
    ],
  },
  {
    rootId: "restoration-demo",
    basePath: "mp3-30s/restoration",
    tracks: RESTORATION_TRACKS,
    defaultMode: "full",
    showModeSwitch: false,
    trackLabel: "Select restoration example",
    trackAriaLabel: "Restoration examples",
    listenNote: "Local audio is encoded as 160 kbps MP3. For each YouTube source, compare 0:00-0:30. Headphones recommended.",
    methods: [
      { name: "Noisy source", type: "youtube", tag: "Input" },
      {
        name: "Clean audio prompt to PianoPoet",
        folder: "pianopoet",
        fixedFile: "clean_prompt",
        extension: "mp3",
        duration: 5,
        tag: "Conditioning",
      },
      {
        name: "PianoPoet restoration",
        detail: "48 kHz stereo",
        folder: "pianopoet",
        extension: "mp3",
        tag: "Zero-shot",
      },
      {
        name: "Moliner denoiser + BABE-2",
        detail: "22.05 kHz mono",
        folder: "babe2",
        extension: "mp3",
        suffix: "_denoised_babe2_bwe",
        tag: "Specialized baseline",
        tagTone: "baseline",
      },
    ],
  },
  {
    rootId: "stereo-demo",
    basePath: "mp3-30s/stereo-control",
    tracks: STEREO_CONTROL_TRACKS,
    defaultMode: "full",
    showModeSwitch: false,
    trackLabel: "Fixed MIDI performance",
    trackAriaLabel: "Stereo-control source performance",
    listenNote: "Prompts are 5 seconds; rendered outputs are 30 seconds. All prompts and renderings are full-band stereo. Headphones recommended.",
    methods: [
      {
        name: "Dry / left prompt",
        detail: "5-second acoustic conditioning",
        relativePath: "dry-left-prompt.mp3",
        duration: 5,
        tag: "Prompt",
      },
      {
        name: "Dry / left rendering",
        detail: "30-second PianoPoet rendering",
        folder: "dry-left",
        extension: "mp3",
        tag: "Left",
        tagTone: "left",
      },
      {
        name: "Wet / center prompt",
        detail: "5-second acoustic conditioning",
        basePath: "mp3-30s/restoration",
        folder: "pianopoet",
        fixedFile: "clean_prompt",
        extension: "mp3",
        duration: 5,
        tag: "Prompt",
      },
      {
        name: "Wet / center rendering",
        detail: "30-second PianoPoet rendering",
        basePath: "mp3-30s/restoration",
        folder: "pianopoet",
        extension: "mp3",
        tag: "Center",
        tagTone: "center",
      },
      {
        name: "Dry / right prompt",
        detail: "5-second acoustic conditioning",
        relativePath: "dry-right-prompt.mp3",
        duration: 5,
        tag: "Prompt",
      },
      {
        name: "Dry / right rendering",
        detail: "30-second PianoPoet rendering",
        folder: "dry-right",
        extension: "mp3",
        tag: "Right",
        tagTone: "right",
      },
    ],
  },
];

let globalActiveAudio = null;

function formatTime(value) {
  const seconds = Math.max(0, Math.floor(Number.isFinite(value) ? value : 0));
  const minutes = Math.floor(seconds / 60);
  const remainder = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function formatBoundaryTime(value) {
  const wholeSeconds = Math.floor(value);
  const fraction = Number.isInteger(value) ? "" : `.${Math.round((value % 1) * 10)}`;
  return `${formatTime(wholeSeconds)}${fraction}`;
}

class AudioComparison {
  constructor(root, config) {
    this.root = root;
    this.config = config;
    this.tracks = config.tracks ?? TRACKS;
    this.trackIndex = 0;
    this.mode = config.defaultMode ?? "excerpt";
    this.volume = 0.8;
    this.activeAudio = null;
    this.rows = [];
    this.renderShell();
    this.renderMethods();
  }

  get track() {
    return this.tracks[this.trackIndex];
  }

  get bounds() {
    if (this.mode === "full") {
      return { start: 0, end: this.track.duration };
    }

    return {
      start: Math.max(0, this.track.excerptStart),
      end: Math.min(this.track.duration, this.track.excerptEnd),
    };
  }

  getRowBounds(rowState) {
    const { start, end } = this.bounds;
    const duration = rowState.method.duration ?? this.track.duration;
    return {
      start: Math.min(start, duration),
      end: Math.min(end, duration),
    };
  }

  renderShell() {
    this.root.innerHTML = `
      <p class="listen-note">${this.config.listenNote ?? "Local audio is encoded as 160 kbps MP3. Headphones recommended for critical listening."}</p>
      <div class="demo-topbar">
        <div>
          <span class="track-label">${this.config.trackLabel ?? "Select performance"}</span>
          <div class="track-picker" role="tablist" aria-label="${this.config.trackAriaLabel ?? "Performances"}">
            ${this.tracks.map(
              (track, index) => `
                <button
                  class="track-button"
                  type="button"
                  role="tab"
                  aria-selected="${index === this.trackIndex}"
                  data-track-index="${index}"
                >
                  <span>${String(index + 1).padStart(2, "0")}</span>
                  <strong>${track.shortLabel ?? track.composer.replace(/^.*\. /, "")}</strong>
                </button>
              `,
            ).join("")}
          </div>
        </div>
        <label class="volume-control">
          Volume
          <input type="range" min="0" max="1" step="0.05" value="${this.volume}" aria-label="Volume" />
        </label>
      </div>
      <div class="demo-context">
        <div>
          <h3 class="track-title"></h3>
          <p class="track-meta"></p>
        </div>
        ${
          this.config.showModeSwitch === false
            ? ""
            : `<div class="mode-switch" role="group" aria-label="Playback range">
                <button class="mode-button" type="button" data-mode="excerpt" aria-pressed="true">
                  Selected excerpt
                </button>
                <button class="mode-button" type="button" data-mode="full" aria-pressed="false">
                  30-second preview
                </button>
              </div>`
        }
      </div>
      <div class="list-heading" aria-hidden="true">
        <span>Method</span>
        <span>Playback</span>
      </div>
      <div class="method-list"></div>
    `;

    this.methodList = this.root.querySelector(".method-list");
    this.trackTitle = this.root.querySelector(".track-title");
    this.trackMeta = this.root.querySelector(".track-meta");

    this.root.querySelectorAll(".track-button").forEach((button) => {
      button.addEventListener("click", () => this.selectTrack(Number(button.dataset.trackIndex)));
    });

    this.root.querySelectorAll(".mode-button").forEach((button) => {
      button.addEventListener("click", () => this.setMode(button.dataset.mode));
    });

    this.root.querySelector(".volume-control input").addEventListener("input", (event) => {
      this.volume = Number(event.target.value);
      this.rows.forEach(({ audio }) => {
        audio.volume = this.volume;
      });
    });
  }

  renderMethods() {
    this.pauseActive();
    this.rows.forEach((rowState) => {
      rowState.disposed = true;
    });
    this.rows = [];
    this.methodList.replaceChildren();

    this.config.methods.forEach((method, index) => {
      const row = document.createElement("div");
      row.className = `method-row${method.tag === "Ours" ? " method-row--ours" : ""}${method.type === "youtube" ? " method-row--source" : ""}`;
      const tagClass = method.tag === "Reference"
        ? " method-tag--reference"
        : method.tagTone
          ? ` method-tag--${method.tagTone}`
          : "";
      row.innerHTML = `
        <div class="method-name">
          <strong>${method.name}</strong>
          ${method.detail ? `<span class="method-detail">${method.detail}</span>` : ""}
          ${method.tag ? `<span class="method-tag${tagClass}">${method.tag}</span>` : ""}
        </div>
        ${
          method.type === "youtube"
            ? `<div class="source-reference">
                <a
                  href="https://www.youtube.com/watch?v=${encodeURIComponent(this.track.youtubeId)}&amp;t=0s"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View original recording on YouTube <span aria-hidden="true">&#8599;</span>
                </a>
                <span class="method-detail">Opens in a new tab. Compare the first 30 seconds (0:00-0:30).</span>
              </div>`
            : `<button
                class="play-button"
                type="button"
                aria-label="Play ${method.name}"
                aria-pressed="false"
              >
                <span class="play-icon" aria-hidden="true">&#9654;</span>
              </button>
              <input class="timeline" type="range" step="0.05" aria-label="Seek ${method.name}" />
              <span class="time-display">0:00 / 0:10</span>`
        }
      `;

      if (method.type === "youtube") {
        this.methodList.append(row);
        return;
      }

      const audio = new Audio();
      audio.preload = "none";
      audio.volume = this.volume;
      const basePath = method.basePath ?? this.config.basePath;

      const rowState = {
        method,
        row,
        audio,
        sourceUrl: method.relativePath
          ? `${basePath}/${method.relativePath}`
          : `${basePath}/${method.folder}/${method.fixedFile ?? this.track.file}${method.suffix ?? ""}.${method.extension}`,
        loadPromise: null,
        disposed: false,
        playbackTime: this.bounds.start,
        button: row.querySelector(".play-button"),
        icon: row.querySelector(".play-icon"),
        timeline: row.querySelector(".timeline"),
        timeDisplay: row.querySelector(".time-display"),
      };

      rowState.button.addEventListener("click", () => this.togglePlayback(rowState));
      rowState.timeline.addEventListener("input", (event) => {
        const { start } = this.getRowBounds(rowState);
        rowState.playbackTime = start + Number(event.target.value);
        if (this.activeAudio === audio) {
          audio.currentTime = rowState.playbackTime;
        }
        this.updateRows();
      });
      audio.addEventListener("timeupdate", () => this.handleTimeUpdate(rowState));
      audio.addEventListener("play", () => this.setPlayingState(rowState));
      audio.addEventListener("pause", () => this.clearPlayingState(rowState));
      audio.addEventListener("ended", () => {
        this.clearPlayingState(rowState);
        this.resetToStart(rowState);
        if (this.activeAudio === audio) {
          this.activeAudio = null;
        }
        if (globalActiveAudio === audio) {
          globalActiveAudio = null;
        }
      });
      audio.addEventListener("error", () => this.showAudioError(rowState));

      this.rows.push(rowState);
      this.methodList.append(row);
    });

    this.updateContext();
    this.updateRows();
  }

  selectTrack(index) {
    if (index === this.trackIndex) {
      return;
    }

    this.trackIndex = index;
    this.mode = this.config.defaultMode ?? "excerpt";

    this.root.querySelectorAll(".track-button").forEach((button) => {
      button.setAttribute("aria-selected", String(Number(button.dataset.trackIndex) === index));
    });
    this.root.querySelectorAll(".mode-button").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.mode === this.mode));
    });

    this.renderMethods();
  }

  setMode(mode) {
    if (mode === this.mode) {
      return;
    }

    this.pauseActive();
    this.mode = mode;
    this.rows.forEach((rowState) => {
      rowState.playbackTime = this.getRowBounds(rowState).start;
    });

    this.root.querySelectorAll(".mode-button").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.mode === mode));
    });
    this.updateContext();
    this.updateRows();
  }

  async togglePlayback(rowState) {
    const { audio, button } = rowState;
    if (this.activeAudio === audio && !audio.paused) {
      audio.pause();
      return;
    }

    if (globalActiveAudio && globalActiveAudio !== audio) {
      globalActiveAudio.pause();
    }
    if (this.activeAudio && this.activeAudio !== audio) {
      this.activeAudio.pause();
    }

    this.activeAudio = audio;
    globalActiveAudio = audio;
    audio.volume = this.volume;
    button.disabled = true;

    try {
      await this.prepareAudio(rowState);
      if (this.activeAudio !== audio || globalActiveAudio !== audio) {
        return;
      }
      const { start, end } = this.getRowBounds(rowState);
      const targetTime = Math.min(Math.max(rowState.playbackTime, start), end - 0.05);
      if (Math.abs(audio.currentTime - targetTime) > 0.01) {
        await new Promise((resolve, reject) => {
          const handleSeeked = () => {
            audio.removeEventListener("seeked", handleSeeked);
            audio.removeEventListener("error", handleError);
            resolve();
          };
          const handleError = (event) => {
            audio.removeEventListener("seeked", handleSeeked);
            audio.removeEventListener("error", handleError);
            reject(event);
          };

          audio.addEventListener("seeked", handleSeeked);
          audio.addEventListener("error", handleError);
          audio.currentTime = targetTime;
        });
      }
      if (this.activeAudio !== audio || globalActiveAudio !== audio) {
        return;
      }
      await audio.play();
    } catch (error) {
      if (error.name !== "AbortError") {
        this.showAudioError(rowState);
      }
    } finally {
      button.disabled = false;
    }
  }

  async prepareAudio(rowState) {
    if (!rowState.loadPromise) {
      rowState.loadPromise = new Promise((resolve, reject) => {
        rowState.audio.src = rowState.sourceUrl;
        rowState.audio.load();
        rowState.audio.addEventListener("loadedmetadata", resolve, { once: true });
        rowState.audio.addEventListener("error", reject, { once: true });
      }).catch((error) => {
        rowState.loadPromise = null;
        throw error;
      });
    }

    await rowState.loadPromise;
  }

  handleTimeUpdate(rowState) {
    const { audio } = rowState;
    if (audio !== this.activeAudio) {
      return;
    }

    const { start, end } = this.getRowBounds(rowState);
    if (audio.currentTime >= end) {
      audio.pause();
      audio.currentTime = start;
      rowState.playbackTime = start;
    } else {
      rowState.playbackTime = Math.max(start, audio.currentTime);
    }
    this.updateRows();
  }

  setPlayingState(activeRow) {
    this.rows.forEach((rowState) => {
      const isActive = rowState === activeRow;
      rowState.row.classList.toggle("is-active", isActive);
      rowState.button.setAttribute("aria-pressed", String(isActive));
      rowState.button.setAttribute(
        "aria-label",
        `${isActive ? "Pause" : "Play"} ${rowState.method.name}`,
      );
      rowState.icon.innerHTML = isActive ? "&#10074;&#10074;" : "&#9654;";
    });
  }

  clearPlayingState(rowState) {
    rowState.row.classList.remove("is-active");
    rowState.button.setAttribute("aria-pressed", "false");
    rowState.button.setAttribute("aria-label", `Play ${rowState.method.name}`);
    rowState.icon.innerHTML = "&#9654;";
  }

  pauseActive() {
    if (this.activeAudio) {
      this.activeAudio.pause();
      if (globalActiveAudio === this.activeAudio) {
        globalActiveAudio = null;
      }
      this.activeAudio = null;
    }
  }

  resetToStart(rowState) {
    const { start } = this.getRowBounds(rowState);
    rowState.playbackTime = start;
    this.updateRows();
  }

  updateContext() {
    const { start, end } = this.bounds;
    this.trackTitle.textContent = this.track.title ?? this.track.composer;
    this.trackMeta.textContent = this.config.showModeSwitch === false
      ? `${formatTime(this.track.duration)} comparison`
      : this.mode === "excerpt"
        ? `Selected window ${formatBoundaryTime(start)}-${formatBoundaryTime(end)} of ${formatTime(this.track.duration)}`
        : `Full preview - ${formatTime(this.track.duration)}`;
  }

  updateRows() {
    this.rows.forEach((rowState) => {
      const { start, end } = this.getRowBounds(rowState);
      const length = end - start;
      const current = Math.min(Math.max(rowState.playbackTime, start), end);
      const progress = length > 0 ? ((current - start) / length) * 100 : 0;
      rowState.timeline.min = 0;
      rowState.timeline.max = length;
      rowState.timeline.value = current - start;
      rowState.timeline.style.setProperty("--progress", `${progress}%`);
      rowState.timeDisplay.textContent = `${formatTime(current - start)} / ${formatTime(length)}`;
    });
  }

  showAudioError(rowState) {
    rowState.button.disabled = true;
    rowState.timeDisplay.textContent = "Unavailable";
    rowState.timeDisplay.classList.add("audio-error");
  }
}

DEMOS.forEach((config) => {
  const root = document.getElementById(config.rootId);
  if (root) {
    new AudioComparison(root, config);
  }
});