import { FC, useEffect, useRef, useState } from 'react';
import CartoonImage from '../../assets/cartoon.jpg';
import MovieImage from '../../assets/movie.png';
import LifeImage from '../../assets/life.jpg';
import FoodImage from '../../assets/food.jpg';
import LogoImage from '../../assets/logo.png';

import styles from './styles.module.scss';
import classNames from 'classnames';

const tabs = [
    {
        key: 'cartoon',
        title: '动画',
        image: CartoonImage
    },
    {
        key: 'food',
        title: '美食',
        image: FoodImage
    },
    {
        key: 'movie',
        title: '电影',
        image: MovieImage
    },
    {
        key: 'life',
        title: '生活',
        image: LifeImage
    }
]

const TAB_HEIGHT = 56;


const SecondSection: FC = () => {

    const [activeTab, setActiveTab] = useState<string>('cartoon');
    const [isFixed, setIsFixed] = useState<boolean>(false);

    const secondSectionRef = useRef<HTMLDivElement>(null);

    const activate = (key: string) => {
        setActiveTab(key);

        const tabContentEl = document.querySelector(`[data-id=${key}]`);

        // scrollIntoView => 滚动元素的父容器，使被调用 scrollIntoView() 的元素对用户可见。
        // 即滚动到当前元素位置
        if (tabContentEl) {
            tabContentEl.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const onScroll = () => {
        //Element.getBoundingClientRect() 方法返回一个 DOMRect 对象，其提供了元素的大小及其相对于视口的位置。

        if (secondSectionRef.current) {
            const { top } = secondSectionRef.current.getBoundingClientRect();
            setIsFixed(top <= 0);
            // if (top <= 0) {
            //     // 吸顶
            //     setIsFixed(true);
            // } else {
            //     // 不吸顶
            //     setIsFixed(false);
            // }

            // sectionNodes 是 nodelist结构
            const sectionNodes = secondSectionRef.current.querySelectorAll('section');

            Array.from(sectionNodes).forEach(sectionEl => {
                const { top } = sectionEl.getBoundingClientRect();
                const key = sectionEl.getAttribute('data-id') || '';

                if (top <= TAB_HEIGHT) {
                    setActiveTab(key);
                }
            })
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, []);

    return (
        <div className={styles.secondSection} ref={secondSectionRef}>
            <ul className={classNames({ [styles.isFixed]: isFixed })}>
                {tabs.map(tab => (
                    <li key={tab.key} onClick={() => activate(tab.key)}>
                        <span>{tab.title}</span>
                        {/* {activeTab === tab.key && <span className={styles.line}></span>} */}
                        <span className={classNames(styles.line, { [styles.visible]: activeTab === tab.key })}></span>
                    </li>
                ))}
            </ul>

            <div>
                {tabs.map(tab => (
                    <section data-id={tab.key} key={tab.key}>
                        <h2>{tab.title}</h2>
                        <img src={tab.image} alt={tab.key} />
                    </section>
                ))}
            </div>

            <div className={classNames(styles.btnWrapper, { [styles.visible]: isFixed })}>
                <img src={LogoImage} alt="LOGO" />
                <button>App 内打开</button>
            </div>
        </div>
    )
}

export default SecondSection;