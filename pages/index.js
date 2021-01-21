import fs from 'fs';
import Link from 'next/link';
import { useEffect } from 'react';

const Home = ({ posts }) => {
  useEffect(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', (user) => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
          });
        }
      });
    }
  }, []);

  return (
    <div>
      {posts.map((post) => {
        return (
          <div>
            <Link key={post} href={`/${post}`}>
              <a>{post}</a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export const getStaticProps = async () => {
  const files = fs.readdirSync('posts');
  return {
    props: {
      posts: files.map((filename) => filename.replace('.md', '')),
    },
  };
};

export default Home;
