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
    
    if movie_soup is not None:
        title = None
        date = None

        title = movie_soup.find('h1').get_text().strip()
        date = movie_soup.find('div', attrs={'data-testid': 'tm-box-up-date'}).get_text().strip()
        rating = movie_soup.find("div", attrs={'data-testid':'hero-rating-bar__popularity__score'}).get_text().strip()
       
        plot_text = movie_soup.find("span", attrs={"data-testid":"plot-xl"}).get_text().strip()

        with open('movies.csv', mode='a') as file:
            movie_writer = csv.writer(file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
            if all([title, date, rating, plot_text]):
                print(title, date, rating, plot_text)
                movie_writer.writerow([title, date, rating, plot_text])


def extract_movies(soup):
    movies_table = soup.find('table', attrs={'data-caller-name': 'chart-moviemeter'}).find('tbody')
    movies_table_rows = movies_table.find_all('tr')
    movie_links = ['https://imdb.com' + movie.find('a')['href'] for movie in movies_table_rows]
    
    movie_link = "https://imdb.com/title/tt4873118/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e9101d6a-9cbe-4310-a9f9-38e3776597d5&pf_rd_r=FV3D4TSPDET8X16CZCG8&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=moviemeter&ref_=chtmvm_tt_100"

    response = BeautifulSoup(requests.get(movie_link, headers=headers).content, 'html.parser')
    movie_soup = response
    
    if movie_soup is not None:
        with open('movies.csv', mode='w') as file:
            file.write('titulo,data,avaliacao,sumario\n')
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_THREADS) as executor:
        executor.map(extract_movie_details, movie_links)
      
def main():
    start_time = time.time()

    # IMDB Most Popular Movies - 100 movies
    popular_movies_url = 'https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm'
    response = requests.get(popular_movies_url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Main function to extract the 100 movies from IMDB Most Popular Movies
    extract_movies(soup)

    end_time = time.time()
    print('Total time taken: ', end_time - start_time)


if __name__ == '__main__':
    main()