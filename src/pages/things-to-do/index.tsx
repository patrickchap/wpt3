import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ArrowLeft: React.FC<React.HTMLProps<HTMLDivElement>> = (props) => (
    <div {...props}><span className="text-xl text-gray-500">&lt;</span></div>
);

const ArrowRight: React.FC<React.HTMLProps<HTMLDivElement>> = (props) => (
    <div {...props}><span className="text-xl text-gray-500">&gt;</span></div>
);

export default function ThingsToDo() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 100,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: <ArrowLeft />,
        nextArrow: <ArrowRight />,
        responsive: [
            {
                breakpoint: 768, // Example breakpoint for smaller screens
                settings: {
                    slidesToShow: 1, // Change to 1 slide for smaller screens
                },
            },
        ],
    };
    return (
        <div className="container mx-auto">
            <section className="h-70vh">
                <h1 className="mt-8 text-3xl font-bold text-primary text-center mb-8">Restaurants</h1>
                <Slider {...settings}>
                    <div>
                        <Card title="Jax At The Tracks" description="Milkshakes, burgers, meatloaf & other American classics served in an old-school diner setting." location="10144 W River St, Truckee, CA 96161" />
                    </div>
                    <div>
                        <Card title="Bar of America" description="Vibrant bar in a historic space offering cocktails & New American plates, plus a patio & live music." location="10040 Donner Pass Rd, Truckee, CA 96161" />
                    </div>
                    <div>
                        <Card title="Fiftyfifty Brewing Co" description="Laid-back local microbrewery & pub with a diverse menu plus retail beer & logo merchandise." location="11197 Brockway Rd #1, Truckee, CA 96161" />
                    </div>
                    <div>
                        <Card title="Blue Coyote Bar & Grill" description="Enduring strip-mall sports bar serving burgers, pizza & other bites along with lots of beers on tap." location="10015 Palisades Dr, Truckee, CA 96161" />
                    </div>
                    <div>
                        <Card title="Wagon Train Coffee Shop" description="Breakfast restaurant in downtown Truckee" location="10080 Donner Pass Rd, Truckee, CA 96161" />
                    </div>
                    <div>
                        <Card title="Full Belly Deli" description="A menu offering a variety of options including sandwiches, subs, wraps, burritos, and salads." location="10825 Pioneer Trail #103, Truckee, CA 96161" />
                    </div>
                    <div>
                        <Card title="Little Truckee Ice Creamery" description="Nestled beside Donner Lake, this quaint scoop shop presents an array of artisanal ice cream flavors, each meticulously crafted from natural ingredients." location="15628 Donner Pass Rd, Truckee, CA 96161" />
                    </div>
                    <div>
                        <Card title="Auld Dubliner Tahoe" description="Shepherd's pie, potato pancakes & craft beer served in a traditional Irish pub with patio tables." location="850+Vlg+S+Rd+%2341,+Olympic+Valley,+CA+96146/@39.1970716,-120.2367304,17z/data=!3m1!4b1!4m6!3m5!1s0x809bd9ec81063499:0xdfcda48b8274232c!8m2!3d39.1970675!4d-120.2341555!16s%2Fg%2F11qp4cqj25?entry=ttu" />
                    </div>
                    <div>
                        <Card title="Rocker" description="American eats sourced from regional farms in a modern-rustic setting at Squaw Valley Ski Resort." location="1960 Olympic Vly Rd, Olympic Valley, CA 96146" />
                    </div>
                </Slider>
            </section>
            <section className="h-70vh">
                <h1 className="mt-8 text-3xl font-bold text-primary text-center mb-8">Coffe Shops</h1>
                <Slider {...settings}>
                    <div>
                        <Card title="Dark Horse Coffee Roasters Truckee" description="Small Batch Coffee Roastery" location="10009 W River St Ste B, Truckee, CA 96161" />
                    </div>
                    <div>
                        <Card title="Coffeebar" description="Local coffeehouse chain serving espresso & tea, plus seasonal crêpes, salads & panini." location="10120 Jibboom St, Truckee, CA 96161" />
                    </div>
                    <div>
                        <Card title="Wild Cherries Coffee House" description="Relaxed hub with outdoor seats offering espresso drinks & baked goods, along with breakfast & lunch." location="11429 Donner Pass Rd, Truckee, CA 96161" />
                    </div>
                    <div>
                        <Card title="The Dam Cafe" description="Homey standby known for breakfast burritos, coffee drinks, smoothies & lunchtime sandwiches." location="55 W Lake Blvd, Tahoe City, CA 96145" />
                    </div>
                </Slider>
            </section>
            <section className="h-70vh">
                <h1 className="mt-8 text-3xl font-bold text-primary text-center mb-8">Hikes</h1>
                <Slider {...settings}>
                    <div>
                        <Card title="Eagle Rock Hiking Trail" description="Generally considered a moderately challenging route, it takes an average of 26 min to complete." location="https://www.alltrails.com/trail/us/california/eagle-rock-trail--2"  isTrail={true}/>
                    </div>
                    <div>
                        <Card title="Tahoe East Shore Trail" description="The trail near Incline Village-Crystal Bay, Nevada is an easy 2.6-mile point-to-point route, with an average completion time of 55 minutes." location="https://www.alltrails.com/trail/us/nevada/tahoe-east-shore-trail" isTrail={true}/>
                    </div>
                    <div>
                        <Card title="Cascade Falls Trail" description="The trail near South Lake Tahoe, California is a moderately challenging 1.3-mile out-and-back route, with an average completion time of 35 minutes." location="https://www.alltrails.com/trail/us/california/cascade-falls" isTrail={true}/>
                    </div>
                    <div>
                        <Card title="Olympic Village via Olympic Valley Bike Trail" description="The trail near Olympic Valley, California is an easy 2.2-mile point-to-point route, with an average completion time of 42 minutes." location="https://www.alltrails.com/trail/us/california/olympic-village-via-olympic-valley-bike-trail" isTrail={true}/>
                    </div>
                </Slider>
            </section>
        </div>
    );

}


const Card: React.FC<{ title: string, description: string, location: string, isTrail?: boolean }> = ({ title, description, location, isTrail = false }) => {
    const googleMapsUrl = `https://www.google.com/maps/place/${location}`;
    return (
        <div className="bg-white shadow-md rounded-lg p-6 m-2 h-96">
            <h3 className="text-xl font-semibold mb-2 border-b border-gray-300 text-center">{title}</h3>
            <p className="text-gray-700  mt-10">{description}</p>
            {isTrail && (
                <p className="text-gray-500 absolute bottom-10">
                    <a href={location} target="_blank" rel="noopener noreferrer">
                       View Hike 
                    </a>
                </p>)}
            {!isTrail && (
                <p className="text-gray-500 absolute bottom-10">
                    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                        Open in Google Maps
                    </a>
                </p>)}
        </div>
    );
}
