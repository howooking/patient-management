export default function page({ params }: { params: { hos_id: string } }) {
  return <div>{params.hos_id}</div>;
}
