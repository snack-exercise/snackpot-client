import VideoCard from "@/components/exercise/VideoCard";
import Image from "next/image";
import Link from "next/link";
import { Time, Calory, Level,ChevronRight,Play } from "@/constant/icon";
import ReviewList from "@/components/exercise/ReviewList";
import ExerciseStoreCard from "@/components/exercise/ExerciseStoreCard";

interface ExerciseDataType {
    thumbnail: string | null;
    youtuberProfileImg: string;
    effect: string;
    videoId: string;
    title: string;
    youtuberName: string;
    youtuberChannelId: string;
    youtuberDescription: string;
    timeSpent: number;
    bodyPart: string;
    level: string;
    calories: number;
    like: boolean;
    bodyPartTypes: string[];
}

async function getExerciseData(exerciseId : number) {
    try {
        const apiURL = process.env.NEXT_PUBLIC_SERVER_URL
        const res = await fetch(`${apiURL}/exercises/${exerciseId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
            },
            // cache: 'no-store'
        });

        if (!res.ok) {
          console.log('Error:', res.status, res.statusText);
          throw new Error('Failed to fetch data');
        }
        
        const data = await res.json();
        console.log('???------------------------------',data);
        return data;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default async function ExerciseId({ params }: { params: { exerciseId: number } }) {
    const responseData = await getExerciseData(params.exerciseId);
    const data : ExerciseDataType= responseData.result.data
    const levelList: { [key: string]: string } = {'EASY':'초급', "MEDIUM":'중급', 'HARD':'고급'};
    const bodyPartList: { [key: string]: string } = {'FULL_BODY':'전신', 'UPPER_BODY':'상체', 'LOWER_BODY':'하체', 'CORE':'코어', 'ARMS':'팔', 'LEGS':'다리', 'BACK':'등', 'CHEST':'가슴', 'SHOULDERS':'어깨'};
    console.log('exercise:',data)

    return (
        <div className="flex flex-col items-center w-full">
            {/* <ExerciseStoreCard videoId={data.videoId} calory={data.calory} time={data.timeSpent} /> */}
            <ExerciseStoreCard videoId={data.videoId} calory={data.calories} time={data.timeSpent} />
            <Link href={`/exercise/${params.exerciseId}/execution`} className="h-[250px] w-fixwidth relative z-0">
                {
                    data.thumbnail &&
                    <Image
                    src={data.thumbnail}
                    layout='fill'
                    alt="thumbnail"
                    className="rounded-[16px]"
                    objectFit="cover"
                    objectPosition="center"
                    />
                }
                <div className="absolute rounded-[16px] inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-SystemGray7 bg-opacity-20 h-[56px] w-[56px] flex justify-center items-center rounded-full">
                        <Image
                        src={Play}
                        width={24}
                        height={24}
                        alt="Play"
                        />
                    </div>
                </div>
            </Link>
            <div className="w-fixwidth flex flex-col">
                <div className="font-bold text-[20px] pt-[20px]">
                    {data.title}
                </div>
                <div className="flex justify-between py-[40px]">
                    <div className="">
                        <div className="flex flex-row items-center">
                            <div className="w-[40px] h-[40px] relative">
                                <Image
                                    src={data.youtuberProfileImg}
                                    alt="youtuberThumbnail"
                                    className="rounded-full"
                                    layout="fill"
                                    objectFit="cover"
                                    objectPosition="center"
                                    />
                            </div>
                            <div className="pl-[12px]"/>
                            <span className="text-[16px] pb-[4px]">{data.youtuberName}</span>
                        </div>
                        <div className="pt-[10px]"/>
                        <div className="flex flex-col">
                            <span className="text-[14px] text-SystemGray3">{data.youtuberDescription}</span>
                        </div>
                    </div>
                    {/* <Image
                    src={ChevronRight}
                    alt="ChevronRight"
                    width={20}
                    height={20}
                    /> */}
                </div>
                <div className="py-[20px] h-[80px] rounded-[16px] flex bg-white items-center flex-row justify-around">
                    <div className="flex flex-col items-center">
                        <Image
                        src={Time}
                        width={24}
                        height={24}
                        alt="Time"
                        />
                        <span className="text-SystemGray2 text-[12px] pt-[8px]">
                        {
                            data.timeSpent >= 60 ? 
                            data.timeSpent % 60 ==0?
                            `${Math.floor(data.timeSpent/60)}분` :
                            `${Math.floor(data.timeSpent/60)}분 ${data.timeSpent%60}초`:
                            `${data.timeSpent%60}초`
                        }
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Image
                        src={Level}
                        width={24}
                        height={24}
                        alt="Level"
                        />
                        <span className="text-SystemGray2 text-[12px] pt-[8px]">
                            {levelList[data.level]}
                        </span>
                    </div>
                    <div className="flex flex-col items-center text-SystemGray2 text-[12px]">
                        <Image
                        src={Calory}
                        width={24}
                        height={24}
                        alt="Calory"
                        />
                        <span className="text-SystemGray2 text-[12px] pt-[8px]">
                            {data.calories}kcal
                        </span>
                    </div>
                </div>
                <div className="py-[40px] flex flex-col">
                    <span className="font-bold pb-[8px]">
                        운동 효과
                    </span>
                    <span className="text-SystemGray3 text-[14px]">
                        {data.effect}
                    </span>
                </div>
                <div className="flex flex-col pb-[40px]">
                    <span className="font-bold pb-[8px]">
                        운동 부위
                    </span>
                    <span className="text-SystemGray3 text-[14px] flex">
                        {data.bodyPartTypes.map((value, idx) => {
                            return(
                                <div key={idx}>
                                    {bodyPartList[value]}
                                    &nbsp; 
                                </div>
                            )
                        })}
                    </span>
                </div>
                <ReviewList exerciseId={params.exerciseId} />
                <div className="py-[20px]"/>
            </div>
        </div>
    );
};
