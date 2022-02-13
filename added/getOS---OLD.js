// * getting operation system info for start page * \\


class SimpleInfoObj {
  constructor(options) {
    (this.title = options.title),
      (this.littleInfo = options.littleInfo),
      (this.getTime = options.getTime);
  }
}


const getOSInfo = () => {
  // * getting time then data was got * \\
  let getMoment = moment().format("MMMM Do YYYY, h:mm:ss a");

  const OsPlatform = new SimpleInfoObj({
    title: `Operation system: ${os.platform()}`,
    littleInfo: "Getting data about peration system",
    getTime: getMoment,
  });
  const OsArch = new SimpleInfoObj({
    title: `CPU architecture: ${os.arch()}`,
    littleInfo: "Getting data about CPU arch",
    getTime: getMoment,
  });
  const OsCPUUse = new SimpleInfoObj({
    title: os.cpus(),
    littleInfo: "Getting CPU info",
    getTime: getMoment,
  });
  const OsMemoryGlobal = Object.create(
    {},
    {
      title: {
        value: `Operation system memory`,
      },
      freeMemory: {
        get() {
          let freeMemoBytes = os.freemem(), // bytes
            freeMemoKb = freeMemoBytes / 1024, // kb
            freeMemoMb = Math.floor(freeMemoKb / 1024), // mb
            freeMemoGb = Math.floor(freeMemoMb / 1024); // Gb

          return [
            `${freeMemoBytes} bytes`,
            `${freeMemoKb} kb`,
            `${freeMemoMb} mb`,
            `${freeMemoGb} gb`,
          ];
        },
      },
      globalMemory: {
        get() {
          let globalMemoryBytes = os.totalmem(), // bytes
            globalMemoryKb = globalMemoryBytes / 1024, // kb
            globalMemoryMb = Math.floor(globalMemoryKb / 1024), // mb
            globalMemoryGb = Math.floor(globalMemoryMb / 1024); // Gb

          return [
            `${globalMemoryBytes} bytes`,
            `${globalMemoryKb} kb`,
            `${globalMemoryMb} mb`,
            `${globalMemoryGb} gb`,
          ];
        },
      },
    }
  );
  const OsGlobalWorkTime = new SimpleInfoObj({
    title: `PC is active: `,
  });

  let OSInfo = [OsPlatform, OsArch, OsCPUUse, OsMemoryGlobal.globalMemory];

  console.log(OSInfo);
};