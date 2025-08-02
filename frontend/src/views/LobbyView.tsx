import type { Player } from '../types'

type Props = {
  players: Player[];
  onStartGame: () => void;
  onChangeCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const LobbyView = (props: Props) => {
  const { players, onStartGame, onChangeCategory } = props

  const categoriesData = [
    {
      label: 'General Knowledge',
      options: [
        { value: 'general_knowledge_general', text: 'General' },
        { value: 'general_knowledge_facts_figures', text: 'Facts & Figures' },
        {
          value: 'general_knowledge_sayings_idioms',
          text: 'Common Sayings & Idioms',
        },
      ],
    },
    {
      label: 'Pop Culture',
      options: [
        { value: 'pop_culture_general', text: 'General' },
        {
          value: 'pop_culture_celebrities_gossip',
          text: 'Celebrities & Gossip',
        },
        { value: 'pop_culture_trends_fads', text: 'Trends & Fads' },
        {
          value: 'pop_culture_social_media_internet',
          text: 'Social Media & Internet Culture',
        },
        {
          value: 'pop_culture_viral_videos_memes',
          text: 'Viral Videos & Memes',
        },
      ],
    },
    {
      label: 'Movies',
      options: [
        { value: 'movies_general', text: 'General' },
        { value: 'movies_blockbusters', text: 'Blockbusters' },
        { value: 'movies_action_adventure', text: 'Action & Adventure' },
        { value: 'movies_comedy', text: 'Comedy' },
        { value: 'movies_drama', text: 'Drama' },
        { value: 'movies_horror', text: 'Horror' },
        { value: 'movies_scifi_fantasy', text: 'Sci-Fi & Fantasy' },
        { value: 'movies_animated', text: 'Animated Films' },
        { value: 'movies_quotes', text: 'Movie Quotes' },
        { value: 'movies_actors_actresses', text: 'Actors & Actresses' },
        { value: 'movies_directors', text: 'Directors' },
        {
          value: 'movies_award_winners',
          text: 'Award Winners (Oscars, Golden Globes, etc.)',
        },
      ],
    },
    {
      label: 'TV Shows',
      options: [
        { value: 'tv_shows_general', text: 'General' },
        { value: 'tv_shows_sitcoms', text: 'Sitcoms' },
        { value: 'tv_shows_dramas', text: 'Dramas' },
        { value: 'tv_shows_reality_tv', text: 'Reality TV' },
        { value: 'tv_shows_game_shows', text: 'Game Shows' },
        { value: 'tv_shows_cartoons_animation', text: 'Cartoons & Animation' },
        {
          value: 'tv_shows_streaming_originals',
          text: 'Streaming Originals (Netflix, HBO, Disney+, etc.)',
        },
        { value: 'tv_shows_quotes', text: 'TV Quotes' },
        { value: 'tv_shows_characters', text: 'TV Characters' },
        {
          value: 'tv_shows_award_winners',
          text: 'Award Winners (Emmys, etc.)',
        },
      ],
    },
    {
      label: 'Music',
      options: [
        { value: 'music_general', text: 'General' },
        { value: 'music_70s', text: 'By Decade: 70s' },
        { value: 'music_80s', text: 'By Decade: 80s' },
        { value: 'music_90s', text: 'By Decade: 90s' },
        { value: 'music_00s', text: 'By Decade: 00s' },
        { value: 'music_2010s', text: 'By Decade: 2010s' },
        { value: 'music_current_hits', text: 'By Decade: Current Hits' },
        { value: 'music_pop', text: 'By Genre: Pop' },
        { value: 'music_rock', text: 'By Genre: Rock' },
        { value: 'music_hip_hop', text: 'By Genre: Hip Hop' },
        { value: 'music_rnb', text: 'By Genre: R&B' },
        { value: 'music_country', text: 'By Genre: Country' },
        { value: 'music_classical', text: 'By Genre: Classical' },
        { value: 'music_jazz', text: 'By Genre: Jazz' },
        { value: 'music_electronic', text: 'By Genre: Electronic' },
        { value: 'music_indie', text: 'By Genre: Indie' },
        { value: 'music_artists_bands', text: 'Artists & Bands' },
        { value: 'music_song_lyrics', text: 'Song Lyrics' },
        { value: 'music_albums', text: 'Albums' },
        { value: 'music_award_winners', text: 'Award Winners (Grammys, etc.)' },
      ],
    },
    {
      label: 'Books / Literature',
      options: [
        { value: 'books_literature_general', text: 'General' },
        { value: 'books_literature_classic_novels', text: 'Classic Novels' },
        { value: 'books_literature_modern_fiction', text: 'Modern Fiction' },
        { value: 'books_literature_poetry', text: 'Poetry' },
        { value: 'books_literature_childrens', text: 'Children\'s Literature' },
        {
          value: 'books_literature_fantasy_scifi',
          text: 'Fantasy & Sci-Fi Books',
        },
        { value: 'books_literature_authors', text: 'Authors' },
        { value: 'books_literature_characters', text: 'Book Characters' },
        { value: 'books_literature_quotes', text: 'Literary Quotes' },
      ],
    },
    {
      label: 'Video Games',
      options: [
        { value: 'video_games_general', text: 'General' },
        {
          value: 'video_games_console',
          text: 'Console Games (PlayStation, Xbox, Nintendo)',
        },
        { value: 'video_games_pc', text: 'PC Games' },
        { value: 'video_games_mobile', text: 'Mobile Games' },
        { value: 'video_games_retro', text: 'Retro Games' },
        { value: 'video_games_characters', text: 'Game Characters' },
        { value: 'video_games_developers', text: 'Game Developers' },
        { value: 'video_games_esports', text: 'Esports' },
        { value: 'video_games_soundtracks', text: 'Game Soundtracks' },
      ],
    },
    {
      label: 'Sports',
      options: [
        { value: 'sports_general', text: 'General' },
        {
          value: 'sports_football_soccer',
          text: 'By Sport: Football (Soccer)',
        },
        {
          value: 'sports_american_football',
          text: 'By Sport: American Football',
        },
        { value: 'sports_basketball', text: 'By Sport: Basketball' },
        { value: 'sports_baseball', text: 'By Sport: Baseball' },
        { value: 'sports_tennis', text: 'By Sport: Tennis' },
        { value: 'sports_golf', text: 'By Sport: Golf' },
        { value: 'sports_hockey', text: 'By Sport: Hockey' },
        {
          value: 'sports_athletics',
          text: 'By Sport: Athletics (Track & Field)',
        },
        { value: 'sports_swimming', text: 'By Sport: Swimming' },
        { value: 'sports_motorsports', text: 'By Sport: Motorsports' },
        { value: 'sports_olympics', text: 'Olympics' },
        {
          value: 'sports_world_cups_championships',
          text: 'World Cups / Championships',
        },
        { value: 'sports_famous_athletes', text: 'Famous Athletes' },
        { value: 'sports_team_nicknames', text: 'Team Nicknames' },
        { value: 'sports_history', text: 'Sports History' },
      ],
    },
    {
      label: 'History',
      options: [
        { value: 'history_general', text: 'General' },
        { value: 'history_ancient', text: 'Ancient History' },
        { value: 'history_medieval', text: 'Medieval History' },
        { value: 'history_modern', text: 'Modern History' },
        { value: 'history_world_wars', text: 'World Wars' },
        { value: 'history_famous_figures', text: 'Famous Historical Figures' },
        { value: 'history_events', text: 'Historical Events' },
        {
          value: 'history_american',
          text: 'American History (or specific country history)',
        },
        {
          value: 'history_inventions_discoveries',
          text: 'Inventions & Discoveries',
        },
      ],
    },
    {
      label: 'Geography',
      options: [
        { value: 'geography_general', text: 'General' },
        { value: 'geography_countries_capitals', text: 'Countries & Capitals' },
        { value: 'geography_continents_oceans', text: 'Continents & Oceans' },
        { value: 'geography_mountains_rivers', text: 'Mountains & Rivers' },
        { value: 'geography_cities_landmarks', text: 'Cities & Landmarks' },
        { value: 'geography_flags', text: 'Flags of the World' },
        { value: 'geography_world_wonders', text: 'World Wonders' },
      ],
    },
    {
      label: 'Science',
      options: [
        { value: 'science_general', text: 'General' },
        { value: 'science_biology', text: 'Biology' },
        { value: 'science_chemistry', text: 'Chemistry' },
        { value: 'science_physics', text: 'Physics' },
        { value: 'science_astronomy_space', text: 'Astronomy & Space' },
        { value: 'science_geology', text: 'Geology' },
        {
          value: 'science_inventions_discoveries',
          text: 'Inventions & Discoveries',
        },
        { value: 'science_human_body_medicine', text: 'Human Body & Medicine' },
      ],
    },
    {
      label: 'Art & Literature',
      options: [
        { value: 'art_literature_general', text: 'General' },
        {
          value: 'art_literature_art_paintings',
          text: 'Art: Famous Paintings',
        },
        { value: 'art_literature_art_sculptures', text: 'Art: Sculptures' },
        { value: 'art_literature_art_artists', text: 'Art: Artists' },
        { value: 'art_literature_art_movements', text: 'Art: Art Movements' },
        {
          value: 'art_literature_literature_genres',
          text: 'Literature: Genres',
        },
        {
          value: 'art_literature_literature_authors',
          text: 'Literature: Authors',
        },
        {
          value: 'art_literature_literature_devices',
          text: 'Literature: Literary Devices',
        },
        {
          value: 'art_literature_literature_famous_books',
          text: 'Literature: Famous Books',
        },
      ],
    },
    {
      label: 'Food & Drink',
      options: [
        { value: 'food_drink_general', text: 'General' },
        { value: 'food_drink_cuisines', text: 'Cuisines of the World' },
        {
          value: 'food_drink_dishes_ingredients',
          text: 'Dishes & Ingredients',
        },
        {
          value: 'food_drink_beverages',
          text: 'Beverages (Coffee, Tea, Alcoholic Drinks)',
        },
        { value: 'food_drink_desserts', text: 'Desserts' },
        {
          value: 'food_drink_cooking_culinary',
          text: 'Cooking & Culinary Terms',
        },
      ],
    },
    {
      label: 'Animals',
      options: [
        { value: 'animals_general', text: 'General' },
        { value: 'animals_mammals', text: 'Mammals' },
        { value: 'animals_birds', text: 'Birds' },
        { value: 'animals_reptiles', text: 'Reptiles' },
        { value: 'animals_amphibians', text: 'Amphibians' },
        { value: 'animals_fish', text: 'Fish' },
        { value: 'animals_insects_arachnids', text: 'Insects & Arachnids' },
        { value: 'animals_marine_life', text: 'Marine Life' },
        {
          value: 'animals_domestic',
          text: 'Domestic Animals (Cats, Dogs, Horses)',
        },
        { value: 'animals_wild', text: 'Wild Animals' },
        { value: 'animals_behavior', text: 'Animal Behavior' },
      ],
    },
    {
      label: 'Mythology',
      options: [
        { value: 'mythology_general', text: 'General' },
        { value: 'mythology_greek', text: 'Greek Mythology' },
        { value: 'mythology_roman', text: 'Roman Mythology' },
        { value: 'mythology_norse', text: 'Norse Mythology' },
        { value: 'mythology_egyptian', text: 'Egyptian Mythology' },
        { value: 'mythology_mythical_creatures', text: 'Mythical Creatures' },
      ],
    },
    {
      label: 'Technology',
      options: [
        { value: 'technology_general', text: 'General' },
        {
          value: 'technology_computers_software',
          text: 'Computers & Software',
        },
        { value: 'technology_gadgets_devices', text: 'Gadgets & Devices' },
        {
          value: 'technology_programming_languages',
          text: 'Programming Languages',
        },
        { value: 'technology_internet_web', text: 'Internet & Web' },
        { value: 'technology_ai', text: 'Artificial Intelligence' },
        { value: 'technology_robotics', text: 'Robotics' },
      ],
    },
    {
      label: 'Current Events',
      options: [
        { value: 'current_events_general', text: 'General' },
        { value: 'current_events_news', text: 'News (Recent Headlines)' },
        { value: 'current_events_politics', text: 'Politics (Recent Events)' },
        {
          value: 'current_events_global_developments',
          text: 'Major Global Developments',
        },
      ],
    },
    {
      label: 'Holidays',
      options: [
        { value: 'holidays_general', text: 'General' },
        { value: 'holidays_christmas', text: 'Christmas' },
        { value: 'holidays_halloween', text: 'Halloween' },
        { value: 'holidays_thanksgiving', text: 'Thanksgiving' },
        { value: 'holidays_valentines', text: 'Valentine\'s Day' },
        { value: 'holidays_easter', text: 'Easter' },
        { value: 'holidays_cultural_festivals', text: 'Cultural Festivals' },
      ],
    },
    {
      label: 'Language & Words',
      options: [
        { value: 'language_words_general', text: 'General' },
        { value: 'language_words_vocabulary', text: 'Vocabulary' },
        { value: 'language_words_etymology', text: 'Etymology' },
        { value: 'language_words_grammar', text: 'Grammar' },
        { value: 'language_words_spelling', text: 'Spelling' },
        {
          value: 'language_words_foreign_phrases',
          text: 'Foreign Words/Phrases',
        },
      ],
    },
  ]

  return (
    <>
      <h2>Select Categories:</h2>
      <select
        name="categories"
        id="categories"
        multiple
        onChange={onChangeCategory}
        style={{ height: 500 }}
      >
        {categoriesData.map((categoryGroup) => (
          <optgroup key={categoryGroup.label} label={categoryGroup.label}>
            {categoryGroup.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      <h2>Players:</h2>
      <ul>
        {players.map((player) => (
          <li>{player.username}</li>
        ))}
      </ul>

      <button onClick={onStartGame}>Start Game</button>
    </>
  )
}
