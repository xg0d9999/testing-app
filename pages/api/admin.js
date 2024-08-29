// pages/admin.js
import { getSession } from 'next-auth/react';

export default function Admin({ session }) {
  if (session.user.role !== 'admin') {
    return <p>Access Denied</p>;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Manage your application here.</p>
      {/* Implement admin functionalities here */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
