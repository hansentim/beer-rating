type Beer = {
  id: number;
  name: string;
  description: string;
  rating: number;
};

type BeerCardProps = {
  beer: Beer;
};

export default function BeerCard({ beer }: BeerCardProps) {
  return (
    <div className='border p-4 rounded-lg shadow-md'>
      <h2 className='text-lg font-semibold'>{beer.name}</h2>
      <p className='text-gray-600'>{beer.description}</p>
      <div className='mt-4'>
        <button className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'>
          Vote
        </button>
      </div>
    </div>
  );
}
