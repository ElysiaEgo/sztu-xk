import { stdout as log } from 'single-line-log'

const kcids = ['']
const jx0404ids = ['']
const JSESSIONID1 = ''
const JSESSIONID2 = ''
const SERVERID = ''
const interval = 10000

const sleep = async (ms: number): Promise<void> => {
  await new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const requestXk = async (kcid: string, jx0404id: string): Promise<any> => {
  return await fetch(`https://jwxt.sztu.edu.cn/jsxsd/xsxkkc/ggxxkxkOper?kcid=${kcid}&cfbs=null&jx0404id=${jx0404id}&xkzy=&trjf=`, {
    headers: {
      accept: '*/*',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
      'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Microsoft Edge";v="116"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'x-requested-with': 'XMLHttpRequest',
      cookie: `JSESSIONID=${JSESSIONID1}; JSESSIONID=${JSESSIONID2}; SERVERID=${SERVERID}`,
      Referer: 'https://jwxt.sztu.edu.cn/jsxsd/xsxkkc/comeInGgxxkxk',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    },
    body: null,
    method: 'GET'
  }).then(async res => await res.json())
}

void (async () => {
  let success = 0
  let tryTimes = 0
  const results: string[] = []
  for (let i = 0; i < kcids.length; i++) {
    results.push('')
  }
  for (let i = 0; i < kcids.length; i++) {
    const kcid = kcids[i]
    const jx0404id = jx0404ids[i]
    void (async () => {
      while (true) {
        const res = await requestXk(kcid, jx0404id)
        results[i] = JSON.stringify(res)
        if (res.message !== undefined && (res.message as string).includes('成功')) {
          success++
          break
        }
        tryTimes++
        await sleep(interval)
      }
    })()
  }
  setInterval(() => {
    log(`已尝试：${tryTimes / kcids.length} 已完成：${success}\n${results.join('\n')}`)
  }, 1000)
})()
