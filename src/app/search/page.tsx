import { searchTours } from '@/lib/api';
import Card from '@/components/Card';
import SearchInput from '@/components/SearchInput';
import styles from './page.module.css';

export default async function SearchPage({ 
    searchParams 
}: { 
    searchParams: Promise<{ q?: string }> 
}) {
    const { q: keyword } = await searchParams;
    const tours = keyword ? await searchTours(keyword) : [];

    return (
        <div className={styles.container}>
            <section className={styles.searchSection}>
                <div className={styles.searchInner}>
                    <SearchInput defaultValue={keyword} /> 
                </div>
            </section>

            <h2 className={styles.title}>
                {keyword ? (
                    <><span>&lsquo;{keyword}&rsquo;</span> 검색 결과 ({tours.length})</>
                ) : (
                    <>검색어를 입력해주세요</>
                )}
            </h2>
            
            {tours.length > 0 ? (
                <div className={styles.cardGrid}>
                    {tours.map((tour: any) => (
                        <Card 
                            key={tour.contentid}
                            id={tour.contentid}
                            title={tour.title}
                            image={tour.firstimage}
                            address={tour.addr1}
                            contentTypeId={tour.contenttypeid}
                        />
                    ))}
                </div>
            ) : (
                <div className={styles.noCard}>
                    <p>검색 결과가 없습니다. 다른 검색어를 입력해 보세요!</p>
                </div>
            )}
        </div>
    );
}