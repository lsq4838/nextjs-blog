import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// 解析posts目录
const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // 获取posts目录下的文件
  const fileNames = fs.readdirSync(postsDirectory)
  // 获取posts数据
  const allPostsData = fileNames.map(fileName => {
    // 去掉.md后缀并将文件名作为数据ID
    const id = fileName.replace(/\.md$/, '');
    // 获取文件内容
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf-8');

    // 使用 gray-matter 解析 markdown文件中的metadata部分
    const matterResult = matter(fileContents);

    // 合并数据
    return {
      id,
      ...matterResult.data
    }
  })

  // 根据日期进行排序
  return allPostsData.sort((a, b) => {
    if(a.date < b.date ) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');
  
   // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}
