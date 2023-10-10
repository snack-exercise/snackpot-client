'use client'
import Image from "next/image";
import Link from "next/link";
import { Like, LikeActive, Play } from "@/constant/icon";
import { useRouter } from 'next/navigation'
import { useState } from "react";

interface exerciseType {
    thumbnail: string | null;
    title: string;
    youtuberName: string;
    time: number;
    bodyPartTypes?: string[]; 
    level: string;
    calory: number;
    isLiked: boolean;
    exerciseId: number;
}

const ExerciseCard = ({
    thumbnail,
    title,
    youtuberName,
    time,
    bodyPartTypes,
    level,
    calory,
    isLiked,
    exerciseId
} : exerciseType) => {
    const levelList: { [key: string]: string } = {'easy':'초급', 'mid':'중급', 'hard':'고급'};
    const router = useRouter();
    const LikedImageLink = isLiked ? LikeActive : Like;
    const [like, setLike] = useState(isLiked);

    const handleLikeClick = () => {
        setLike(prev => !prev)
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLInputElement;
        if (target.id === 'like' || target.alt === 'like'){
            console.log('like');
            setLike(prev => !prev);
        }
        else if (target.id === 'play' || target.alt === 'play'){
            router.push(`/exercise/${exerciseId}/execution`)
        }
        else {
            router.push(`/exercise/${exerciseId}`)
        }
    }

    return (
        <div onClick={handleClick} className="flex flex-col w-fixwidth h-[330px] bg-white rounded-[16px]">
            <div className={`h-[180px] font-[16px] bg-no-repeat rounded-t-[16px] flex flex-row justify-between px-[16px] py-[16px] bg-center bg-cover w-[100%] relative`}>
            {/* <div className={`h-[180px] font-[16px] bg-no-repeat rounded-t-[16px] flex flex-row justify-between px-[16px] py-[16px] bg-center bg-cover`} style={{backgroundImage: `url(${thumbnail})`}}> */}
                {/* <img src={`${thumbnail}`} width="100%" height="200px"/> */}
                {thumbnail && <Image
                src={thumbnail}
                layout='fill'
                alt="thumbnail"
                className="rounded-t-[16px]"
                objectFit="cover"
                objectPosition="center"
                loading="lazy"
                placeholder="blur"
                blurDataURL={thumbnail}
                />}
               <button id="play" className="flex justify-center items-center rounded-full w-[44px] h-[44px] bg-SystemGray7_20 absolute top-[16px] right-[16px]">
                    <Image
                        src={Play}
                        alt="play"
                        width={20}
                        height={20}
                    />
                </button>
                <button id='like' className={`absolute flex justify-center items-center rounded-full w-[44px] h-[44px] ${like ? 'bg-SystemBrand' : 'bg-white'}`}>
                    <Image
                        src={LikedImageLink}
                        alt="like"
                        width={20}
                        height={20}
                    />
                </button>
            </div>
            <div className="h-[104px] mx-[16px] mt-[16px]">
                <div className="font-semibold mb-[4px] text-[16px]">
                    {title}
                </div>
                    <div className="font-normal text-SystemGray3 text-[12px] mb-[12px]">
                    {youtuberName}
                </div>
                <div className="text-SystemBrand flex flex-row text-[12px]">
                    <div className="bg-SystemSecondaryBrand rounded-[12px] w-auto px-[12px] mr-[8px]">
                        {
                            time >= 60 ? 
                                time % 60 ==0?
                                    `${Math.floor(time/60)}분` :
                                    `${Math.floor(time/60)}분 ${time%60}초`:
                                `${time%60}초`
                        }
                    </div>
                    <div className="bg-SystemSecondaryBrand rounded-[12px] w-auto px-[12px] mr-[8px]">
                        {/* {bodyPartTypes} */}
                    </div>
                    <div className="bg-SystemSecondaryBrand rounded-[12px] w-auto px-[12px] mr-[8px]">
                        {levelList[level]}
                    </div>
                    <div className="bg-SystemSecondaryBrand rounded-[12px] w-auto px-[12px] mr-[8px]">
                        {calory}kcal
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExerciseCard;