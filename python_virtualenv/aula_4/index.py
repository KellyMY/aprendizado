import requests
import time
import csv
import random
import concurrent.futures


from bs4 import BeautifulSoup

# global headers to be used for requests
headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}

MAX_THREADS = 10


def extract_movie_details(movie_link):
    
    time.sleep(random.uniform(0, 0.2))
    response = BeautifulSoup(requests.get(movie_link, headers=headers).content, 'html.parser')
    movie_soup = response
    # exit(movie_soup)
    if movie_soup is not None:
        title = None
        date = None

        movie_data = movie_soup.find('div', attrs={'class': 'title_wrapper'})
        if movie_data is not None:
            title = movie_data.find('h1').get_text()
            date = movie_data.find('a', attrs={'title': 'See more release dates'}).get_text().strip()

        rating = movie_soup.find('span', attrs={'itemprop': 'ratingValue'}).get_text() if movie_soup.find(
            'span', attrs={'itemprop': 'ratingValue'}) else None

        plot_text = movie_soup.find('div', attrs={'class': 'summary_text'}).get_text().strip() if movie_soup.find(
            'div', attrs={'class': 'summary_text'}) else None

        with open('movies.csv', mode='a') as file:
            movie_writer = csv.writer(file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
            if all([title, date, rating, plot_text]):
                print(title, date, rating, plot_text)
                movie_writer.writerow([title, date, rating, plot_text])


def extract_movies(soup):
    movies_table = soup.find('table', attrs={'data-caller-name': 'chart-moviemeter'}).find('tbody')
    movies_table_rows = movies_table.find_all('tr')
    movie_links = ['https://imdb.com' + movie.find('a')['href'] for movie in movies_table_rows]
    
    threads = min(MAX_THREADS, len(movie_links))
    
    

    movie_link = "https://imdb.com/title/tt4873118/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e9101d6a-9cbe-4310-a9f9-38e3776597d5&pf_rd_r=FV3D4TSPDET8X16CZCG8&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=moviemeter&ref_=chtmvm_tt_100"
    response = BeautifulSoup(requests.get(movie_link, headers=headers).content, 'html.parser')
    movie_soup = response
    
    if movie_soup is not None:
        title = None
        date = None

        movie_data = movie_soup.find('div', attrs={'class': 'title_wrapper'})
    exit
    i = 0
    with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_THREADS) as executor:
        # extract_movie_details(movie_links)
        # exit(executor)
        executor.map(extract_movie_details, movie_links)
        # print(i)
        # i += 1


def main():
    start_time = time.time()

    # IMDB Most Popular Movies - 100 movies
    popular_movies_url = 'https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm'
    response = requests.get(popular_movies_url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')
    # exit(response)
    # Main function to extract the 100 movies from IMDB Most Popular Movies
    extract_movies(soup)

    end_time = time.time()
    print('Total time taken: ', end_time - start_time)


if __name__ == '__main__':
    main()