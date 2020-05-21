let bioScore = 0;
let cpuScore = 0;

export function setBioScore(bio) {
    bioScore = bio;
}

export function setCpuScore(cpu) {
    cpuScore = cpu;
}

export function getScores() {
  return [bioScore, cpuScore];
}
