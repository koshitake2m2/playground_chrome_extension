import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isLoading, setLoading] = useState(false);
  const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);
  const storageKey = "SIMPLE_TAB_MANAGER_KEY_TEST"
  useEffect(() => {
    setLoading(true);
    chrome.tabs.query({}).then((_tabs) => {
      console.log(_tabs.map((t) => t.title))
      // chrome.tabs.remove(_tabs[_tabs.length - 1].id ?? NaN);
      // chrome.tabs.create({
      //   url: "https://developer.chrome.com/"
      // })
      let keyValue: { [key: string]: any } = {}
      keyValue[storageKey] = _tabs.map((t) => t.url)
      chrome.storage.sync.set(keyValue).then(() => {
        chrome.storage.sync.get(storageKey).then((_tabUrls) => {
          console.log('tabUrls', _tabUrls)
        })
      })
      return setTabs(_tabs)
    })
      .then(() => setLoading(false));
  }, [])

  const listTabs = tabs.map((tab) => <li key={tab.id}>{tab.title}</li>)
  return (
    <>
      <Head>
        <title>Simple Tab Manager</title>
      </Head>
      <main className={styles.main}>
        <ul>{listTabs}</ul>
      </main>
    </>
  )
}
